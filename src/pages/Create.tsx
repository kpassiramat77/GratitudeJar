
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/lib/auth-store";
import { StickerCustomizer, type StickerConfig } from "@/components/sticker/StickerCustomizer";
import { GratitudeForm } from "@/components/gratitude/GratitudeForm";
import { stickerConfigToJson } from "@/utils/sticker-utils";

const Create = () => {
  const [gratitudeText, setGratitudeText] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [stickerConfig, setStickerConfig] = useState<StickerConfig>({
    mood: "happy",
    color: "#BAE6FD",
    text: "",
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleSubmit = async () => {
    if (!gratitudeText.trim()) {
      toast({
        title: "Cannot save empty gratitude",
        description: "Please write something you're grateful for",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save gratitudes",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('gratitudes')
        .insert({
          content: gratitudeText.trim(),
          is_public: isPublic,
          user_id: user.id,
          sticker: stickerConfigToJson(stickerConfig)
        });

      if (error) throw error;

      toast({
        title: "Added to your Gratitude Jar",
        description: "Your moment of gratitude has been saved",
      });
      navigate("/jar");
    } catch (error: any) {
      console.error('Error saving gratitude:', error);
      toast({
        title: "Error saving gratitude",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center pt-8">
      <div className="w-full max-w-md px-4">
        <h1 className="text-xl font-semibold mb-4">Create Sticker</h1>
        <div className="space-y-4">
          <StickerCustomizer 
            config={stickerConfig}
            onChange={setStickerConfig}
          />
          
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
