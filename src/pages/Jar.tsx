
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash, Heart } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

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

    if (dateRange?.from) {
      query = query.gte('created_at', dateRange.from.toISOString());
    }
    if (dateRange?.to) {
      const endDate = addDays(dateRange.to, 1);
      query = query.lt('created_at', endDate.toISOString());
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
  }, [user, activeFilter, sortOrder, dateRange]);

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Gratitude Jar</h1>
          <p className="text-purple-600 mt-2">Collection of moments that bring joy to your life</p>
        </header>
        
        <Card className="mb-6 border-purple-100 shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-lg font-medium mb-3">Filter by Mood</h2>
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-200">
              {Object.entries(moodEmojis).map(([mood, { src, alt, color }]) => (
                <Button
                  key={mood}
                  onClick={() => setActiveFilter(activeFilter === mood ? null : mood)}
                  className={`rounded-full px-4 py-1 flex items-center gap-2 flex-shrink-0 ${
                    activeFilter === mood 
                      ? 'bg-purple-100 text-purple-900 shadow-inner' 
                      : 'bg-white text-gray-700 hover:bg-purple-50 border border-purple-100'
                  }`}
                  variant="ghost"
                >
                  <img 
                    src={src} 
                    alt={alt}
                    className="w-5 h-5 object-contain"
                  />
                  <span className="font-medium capitalize">{mood}</span>
                </Button>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                variant="outline"
                className={`rounded-full px-5 py-1 ${
                  !activeFilter ? 'bg-purple-100 border-purple-200 text-purple-900' : ''
                }`}
                onClick={() => setActiveFilter(null)}
              >
                ❤️ All Entries
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-5 py-1"
                onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
              >
                {sortOrder === "newest" ? "⌛ Newest First" : "⏳ Oldest First"}
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`rounded-full px-5 py-1 ${
                      dateRange?.from ? 'bg-purple-100 border-purple-200 text-purple-900' : ''
                    }`}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      "Date Range"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {entries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-purple-100">
            <img 
              src="/lovable-uploads/fb3c5db8-5a82-46cc-b05f-01beed3c07ca.png" 
              alt="Empty jar" 
              className="w-24 h-24 mx-auto mb-6 opacity-50"
            />
            <h3 className="text-xl font-medium text-gray-600 mb-2">Your jar is empty</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">Start adding gratitude moments to fill your jar with positive memories!</p>
            <Button 
              onClick={() => navigate('/create')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Add First Entry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entries.map((entry) => (
              <Card
                key={entry.id}
                className="overflow-hidden transition-all duration-200 hover:shadow-md"
                style={{ 
                  borderColor: entry.sticker?.color || moodEmojis['happy'].color
                }}
              >
                <div 
                  className="p-1"
                  style={{ 
                    backgroundColor: entry.sticker?.color || moodEmojis['happy'].color
                  }}
                />
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={moodEmojis[entry.sticker?.mood as keyof typeof moodEmojis]?.src || moodEmojis['happy'].src}
                        alt={moodEmojis[entry.sticker?.mood as keyof typeof moodEmojis]?.alt || moodEmojis['happy'].alt}
                        className="w-8 h-8 object-contain"
                      />
                      <div>
                        <p className="text-sm text-gray-500">{formatDate(entry.created_at)}</p>
                        <p className="text-xs capitalize text-purple-700">{entry.sticker?.mood || 'happy'}</p>
                      </div>
                    </div>
                    {entry.is_favorite && (
                      <div className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs font-medium">
                        Favorite
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-800 text-lg leading-relaxed mb-4">{entry.content}</p>
                  
                  <div className="flex gap-3 mt-4 justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-500 hover:text-gray-900 p-2"
                      onClick={() => navigate(`/edit/${entry.id}`)}
                    >
                      <Edit size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-500 hover:text-red-600 p-2"
                      onClick={() => handleDeleteEntry(entry.id)}
                    >
                      <Trash size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={`p-2 ${entry.is_favorite ? 'text-pink-500 hover:text-pink-700' : 'text-gray-500 hover:text-pink-500'}`}
                      onClick={() => handleToggleFavorite(entry)}
                    >
                      <Heart size={18} fill={entry.is_favorite ? "currentColor" : "none"} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {entries.length > 0 && (
          <div className="fixed bottom-20 right-6 z-10">
            <Button 
              className="rounded-full h-14 w-14 shadow-lg bg-purple-600 hover:bg-purple-700"
              onClick={() => navigate('/create')}
            >
              <span className="text-2xl">+</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jar;
