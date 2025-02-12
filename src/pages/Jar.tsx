
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GratitudeEntry {
  id: string;
  content: string;
  created_at: string;
  is_favorite: boolean;
  is_public: boolean;
  user_id: string;
  sticker: {
    mood: string;
    color: string;
  } | null;
}

const Jar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const moodEmojis: Record<string, string> = {
    happy: "😃",
    excited: "🤩",
    motivated: "🥺",
    loved: "🥰"
  };

  const getDefaultStickerColor = (mood: string) => {
    const colorMap: Record<string, string> = {
      happy: "#BAE6FD",
      excited: "#E9D5FF",
      motivated: "#FED7AA",
      loved: "#FBCFE8"
    };
    return colorMap[mood] || "#F3F4F6";
  };

  const fetchEntries = async () => {
    if (!user) return;

    let query = supabase
      .from('gratitudes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: sortOrder === "oldest" });

    // Apply mood filter if active
    if (activeFilter && Object.keys(moodEmojis).includes(activeFilter)) {
      query = query.eq('sticker->>mood', activeFilter);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching gratitudes:', error);
      toast({
        title: "Error loading entries",
        description: "Could not load your gratitude entries",
        variant: "destructive",
      });
      return;
    }
    
    // Cast the data to match our interface and ensure sticker data is valid
    const typedData = (data || []).map(entry => ({
      ...entry,
      is_favorite: entry.is_favorite || false,
      sticker: entry.sticker ? {
        mood: (entry.sticker as any).mood || 'happy',
        color: (entry.sticker as any).color || getDefaultStickerColor((entry.sticker as any).mood || 'happy')
      } : {
        mood: 'happy',
        color: getDefaultStickerColor('happy')
      }
    }));
    
    setEntries(typedData);
  };

  const handleDeleteEntry = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('gratitudes')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: "Error deleting entry",
        description: "Could not delete the gratitude entry",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Entry deleted",
      description: "Your gratitude entry has been removed",
    });
    
    // Refresh entries after deletion
    fetchEntries();
  };

  const handleToggleFavorite = async (entry: GratitudeEntry) => {
    if (!user) return;

    const { error } = await supabase
      .from('gratitudes')
      .update({ is_favorite: !entry.is_favorite })
      .eq('id', entry.id)
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: "Error updating entry",
        description: "Could not update favorite status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: entry.is_favorite ? "Removed from favorites" : "Added to favorites",
      description: entry.is_favorite 
        ? "Entry removed from your favorites" 
        : "Entry added to your favorites",
    });
    
    // Refresh entries after toggling favorite
    fetchEntries();
  };

  useEffect(() => {
    fetchEntries();
  }, [user, activeFilter, sortOrder]);

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">My Gratitude Jar</h1>
      
      {/* Mood Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
        {Object.entries(moodEmojis).map(([mood, emoji]) => (
          <Button
            key={mood}
            onClick={() => setActiveFilter(activeFilter === mood ? null : mood)}
            className={`rounded-full px-6 py-2 flex items-center gap-2 ${
              activeFilter === mood 
                ? 'bg-purple-100 text-purple-900' 
                : 'bg-purple-50 text-gray-700 hover:bg-purple-100'
            }`}
            variant="ghost"
          >
            <span className="text-xl">{emoji}</span>
            <span className="font-medium">{mood}</span>
          </Button>
        ))}
      </div>

      {/* Sort and Filter Options */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant="ghost"
          className={`rounded-full px-6 py-2 ${
            !activeFilter && 'bg-purple-100 text-purple-900'
          }`}
          onClick={() => setActiveFilter(null)}
        >
          ❤️ Favorites
        </Button>
        <Button
          variant="ghost"
          className="rounded-full px-6 py-2"
          onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
        >
          🕒 {sortOrder === "newest" ? "Newest First" : "Oldest First"}
        </Button>
        <Button
          variant="ghost"
          className="rounded-full px-6 py-2"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Select Date Range
        </Button>
      </div>

      {/* Gratitude Entries */}
      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Start adding gratitude moments to fill your jar!</p>
            <Button 
              onClick={() => navigate('/create')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Add First Entry
            </Button>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="p-6 rounded-3xl shadow-sm"
              style={{ 
                backgroundColor: entry.sticker?.color || getDefaultStickerColor(entry.sticker?.mood || 'happy')
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-4xl mb-4 block">
                    {moodEmojis[entry.sticker?.mood as keyof typeof moodEmojis] || moodEmojis.happy}
                  </span>
                  <p className="text-gray-800 text-lg">{entry.content}</p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <button 
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => navigate(`/edit/${entry.id}`)}
                >
                  ✏️
                </button>
                <button 
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => handleDeleteEntry(entry.id)}
                >
                  🗑️
                </button>
                <button 
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => handleToggleFavorite(entry)}
                >
                  {entry.is_favorite ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jar;
