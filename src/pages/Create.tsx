
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { StickerCustomizer, type StickerConfig, type Mood } from "@/components/sticker/StickerCustomizer";
import { GratitudeForm } from "@/components/gratitude/GratitudeForm";
import { stickerConfigToJson } from "@/utils/sticker-utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface StickerData {
  mood: Mood;
  color: string;
  text?: string;
}

const isStickerData = (value: unknown): value is StickerData => {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.mood === 'string' &&
    typeof obj.color === 'string' &&
    (obj.text === undefined || typeof obj.text === 'string') &&
    ['happy', 'excited', 'motivated', 'loved', 'peaceful', 'grateful', 'confident', 
     'blessed', 'joyful', 'optimistic', 'energetic', 'content', 'inspired'].includes(obj.mood)
  );
};

const Create = () => {
  const [gratitudeText, setGratitudeText] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [moodIntensity, setMoodIntensity] = useState(3);
  const [stickerConfig, setStickerConfig] = useState<StickerConfig>({
    mood: "happy",
    color: "#F4E7FF",
    text: "",
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (id) {
      const fetchGratitude = async () => {
        const { data, error } = await supabase
          .from('gratitudes')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          toast({
            title: "Error loading entry",
            description: "Could not load the gratitude entry",
            variant: "destructive",
            duration: 500,
          });
          navigate('/jar');
          return;
        }

        if (data) {
          setGratitudeText(data.content);
          setIsPublic(data.is_public);
          if (data.sticker && isStickerData(data.sticker)) {
            setStickerConfig({
              mood: data.sticker.mood,
              color: data.sticker.color,
              text: data.sticker.text || "",
            });
          }
        }
      };

      fetchGratitude();
    }
  }, [id, navigate, toast]);

  const handleSubmit = async () => {
    if (!gratitudeText.trim()) {
      toast({
        title: "Cannot save empty gratitude",
        description: "Please write something you're grateful for",
        variant: "destructive",
        duration: 500,
      });
      return;
    }

    try {
      // Generate a random UUID to use as a user_id since we're not using auth
      const randomUserId = crypto.randomUUID();
      
      if (id) {
        const { error } = await supabase
          .from('gratitudes')
          .update({
            content: gratitudeText.trim(),
            is_public: isPublic,
            sticker: stickerConfigToJson(stickerConfig),
            mood_intensity: moodIntensity
          })
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Entry updated",
          description: "Your gratitude has been updated",
          duration: 500,
        });
      } else {
        const { error } = await supabase
          .from('gratitudes')
          .insert({
            content: gratitudeText.trim(),
            is_public: isPublic,
            user_id: randomUserId,
            sticker: stickerConfigToJson(stickerConfig),
            mood_intensity: moodIntensity
          });

        if (error) throw error;

        toast({
          title: "Added to your Gratitude Jar",
          description: "Your moment of gratitude has been saved",
          duration: 500,
        });
      }
      navigate("/jar");
    } catch (error: any) {
      console.error('Error saving gratitude:', error);
      toast({
        title: "Error saving gratitude",
        description: error.message,
        variant: "destructive",
        duration: 500,
      });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-pastel-gradient-vertical">
      <div className="mx-auto max-w-md px-4 pt-3 pb-20">
        <h1 className="text-lg font-semibold mb-3 text-center text-purple-800">
          {id ? "Edit Sticker" : "Create Sticker"}
        </h1>
        
        <div className="space-y-4">
          <StickerCustomizer 
            config={stickerConfig}
            onChange={setStickerConfig}
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              How intense is this feeling? (1-5)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={moodIntensity}
              onChange={(e) => setMoodIntensity(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Mild</span>
              <span>Strong</span>
            </div>
          </div>
          
          <GratitudeForm 
            gratitudeText={gratitudeText}
            isPublic={isPublic}
            onGratitudeChange={setGratitudeText}
            onPublicChange={setIsPublic}
            onSubmit={handleSubmit}
            onCancel={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
