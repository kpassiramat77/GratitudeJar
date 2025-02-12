
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

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

type TimeView = "yearly" | "monthly" | "daily" | null;

const Jar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeView, setTimeView] = useState<TimeView>(null);

  const moodEmojis: Record<string, { src: string, alt: string, color: string }> = {
    happy: { 
      src: "/lovable-uploads/bbc2aca1-7202-42ce-8f8a-b82acb73be82.png",
      alt: "Smiling face with sunglasses",
      color: "#BAE6FD"
    },
    excited: { 
      src: "/lovable-uploads/855693cd-9b32-4aa4-847f-721315c226fe.png",
      alt: "Excited face with halo",
      color: "#E9D5FF"
    },
    motivated: { 
      src: "/lovable-uploads/c08d6f70-fd9b-4093-b99a-2ce4b8018112.png",
      alt: "Motivated smiling face",
      color: "#FED7AA"
    },
    loved: { 
      src: "/lovable-uploads/fb3c5db8-5a82-46cc-b05f-01beed3c07ca.png",
      alt: "Face with hearts",
      color: "#FBCFE8"
    },
    peaceful: {
      src: "/lovable-uploads/0026f39f-8263-45dc-bccf-4de6a340040c.png",
      alt: "Peaceful smiling face",
      color: "#BBF7D0"
    },
    grateful: {
      src: "/lovable-uploads/65f8700a-195d-4b4f-b8ae-73c0cac09a5c.png",
      alt: "Grateful smiling face",
      color: "#DDD6FE"
    },
    confident: {
      src: "/lovable-uploads/6304d2fb-0064-47aa-9fdd-7c9f2fd99cdd.png",
      alt: "Confident face",
      color: "#FDE68A"
    },
    blessed: {
      src: "/lovable-uploads/7071ed02-3767-43a2-8e02-7d93301373ed.png",
      alt: "Blessed happy face",
      color: "#A5B4FC"
    },
    joyful: {
      src: "/lovable-uploads/cb090a50-8c08-43c4-9b85-f7559cc42fcb.png",
      alt: "Joyful face with hearts",
      color: "#FDA4AF"
    },
    optimistic: {
      src: "/lovable-uploads/5e3faeda-08d8-496a-b248-b8e08e4d970f.png",
      alt: "Optimistic relaxed face",
      color: "#FFDBB5"
    },
    energetic: {
      src: "/lovable-uploads/6aa6af5a-86f9-4a5a-a113-04aee059f525.png",
      alt: "Energetic face",
      color: "#FCA5A5"
    },
    content: {
      src: "/lovable-uploads/449b5720-4357-47a3-80a3-263a31713025.png",
      alt: "Content face with party decorations",
      color: "#93C5FD"
    },
    inspired: {
      src: "/lovable-uploads/4388b5e6-bdd5-438e-9601-b361d8af7032.png",
      alt: "Inspired thinking face",
      color: "#C4B5FD"
    }
  };

  const fetchEntries = async () => {
    if (!user) return;

    let query = supabase
      .from('gratitudes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: sortOrder === "oldest" });

    if (activeFilter && moodEmojis[activeFilter]) {
      query = query.eq('sticker->>mood', activeFilter);
    }

    if (timeView) {
      const now = new Date();
      let startDate;
      
      switch (timeView) {
        case "yearly":
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        case "monthly":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case "daily":
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
      }
      
      query = query.gte('created_at', startDate.toISOString());
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching gratitudes:', error);
      toast({
        title: "Error loading entries",
        description: "Could not load your gratitude entries",
        variant: "destructive",
        duration: 500,
      });
      return;
    }
    
    const typedData = (data || []).map(entry => ({
      ...entry,
      is_favorite: entry.is_favorite || false,
      sticker: entry.sticker ? {
        mood: (entry.sticker as any).mood || 'happy',
        color: (entry.sticker as any).color || moodEmojis['happy'].color
      } : {
        mood: 'happy',
        color: moodEmojis['happy'].color
      }
    }));

    const filteredData = searchQuery
      ? typedData.filter(entry =>
          entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.sticker?.mood.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : typedData;
    
    setEntries(filteredData);
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
        duration: 500,
      });
      return;
    }

    toast({
      title: "Entry deleted",
      description: "Your gratitude entry has been removed",
      duration: 500,
    });
    
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
        duration: 500,
      });
      return;
    }

    toast({
      title: entry.is_favorite ? "Removed from favorites" : "Added to favorites",
      description: entry.is_favorite 
        ? "Entry removed from your favorites" 
        : "Entry added to your favorites",
      duration: 500,
    });
    
    fetchEntries();
  };

  useEffect(() => {
    fetchEntries();
  }, [user, activeFilter, sortOrder, searchQuery, timeView]);

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">My Gratitude Jar</h1>
      
      <div className="space-y-4 mb-6">
        <div className="flex gap-2 relative">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by content or emotion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4">
          <Button
            onClick={() => setTimeView(timeView === "daily" ? null : "daily")}
            variant="outline"
            className={`${timeView === "daily" ? "bg-purple-100 text-purple-900" : ""}`}
          >
            Daily
          </Button>
          <Button
            onClick={() => setTimeView(timeView === "monthly" ? null : "monthly")}
            variant="outline"
            className={`${timeView === "monthly" ? "bg-purple-100 text-purple-900" : ""}`}
          >
            Monthly
          </Button>
          <Button
            onClick={() => setTimeView(timeView === "yearly" ? null : "yearly")}
            variant="outline"
            className={`${timeView === "yearly" ? "bg-purple-100 text-purple-900" : ""}`}
          >
            Yearly
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4">
          {Object.entries(moodEmojis).map(([mood, { src, alt, color }]) => (
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
              <img 
                src={src} 
                alt={alt}
                className="w-6 h-6 object-contain"
              />
              <span className="font-medium capitalize">{mood}</span>
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            className={`rounded-full px-6 py-2`}
            onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
          >
            🕒 {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </Button>
        </div>
      </div>

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
                backgroundColor: entry.sticker?.color || moodEmojis['happy'].color
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <img 
                      src={moodEmojis[entry.sticker?.mood as keyof typeof moodEmojis]?.src || moodEmojis['happy'].src}
                      alt={moodEmojis[entry.sticker?.mood as keyof typeof moodEmojis]?.alt || moodEmojis['happy'].alt}
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-sm text-gray-600">
                      {format(new Date(entry.created_at), 'PPP')}
                    </span>
                  </div>
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
