import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/lib/auth-store";
import { StickerCustomizer, type StickerConfig } from "@/components/sticker/StickerCustomizer";
import { stickerConfigToJson } from "@/utils/sticker-utils";
import { GratitudeForm } from "@/components/gratitude/GratitudeForm";

const Create = () => {
  const [gratitudeText, setGratitudeText] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [stickerConfig, setStickerConfig] = useState<StickerConfig>({
    mood: "happy",
    color: "#F2FCE2",
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
        title: "Gratitude saved",
        description: "Your gratitude has been added to your jar",
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-teal-50 p-4 pb-24">
      <div className="max-w-md mx-auto">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>New Gratitude Entry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Create;
