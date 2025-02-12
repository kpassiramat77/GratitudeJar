
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/lib/auth-store";
import { Circle, Square, Smile, Frown, Heart, Meh } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

type Shape = "circle" | "square" | "heart";
type Mood = "happy" | "sad" | "neutral";

interface StickerConfig {
  shape: Shape;
  mood: Mood;
  color: string;
  text: string;
}

// Helper function to convert StickerConfig to Json type
const stickerConfigToJson = (config: StickerConfig): Json => {
  return {
    shape: config.shape,
    mood: config.mood,
    color: config.color,
    text: config.text
  };
};

const Create = () => {
  const [gratitudeText, setGratitudeText] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [stickerConfig, setStickerConfig] = useState<StickerConfig>({
    shape: "circle",
    mood: "happy",
    color: "#F2FCE2",
    text: "",
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  // Redirect to auth if not signed in
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

  const renderSticker = () => {
    const ShapeComponent = {
      circle: Circle,
      square: Square,
      heart: Heart
    }[stickerConfig.shape];

    const MoodComponent = {
      happy: Smile,
      sad: Frown,
      neutral: Meh
    }[stickerConfig.mood];

    return (
      <div 
        className="relative w-32 h-32 mx-auto mb-4"
        style={{ backgroundColor: stickerConfig.color }}
      >
        <ShapeComponent className="w-full h-full p-2" />
        <MoodComponent className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12" />
        {stickerConfig.text && (
          <div className="absolute bottom-2 left-0 right-0 text-center text-sm font-medium truncate px-2">
            {stickerConfig.text}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-teal-50 p-4 pb-24">
      <div className="max-w-md mx-auto">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>New Gratitude Entry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sticker Preview */}
            {renderSticker()}

            {/* Sticker Customization */}
            <div className="space-y-4">
              <div>
                <Label>Shape</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={stickerConfig.shape === "circle" ? "default" : "outline"}
                    onClick={() => setStickerConfig(c => ({ ...c, shape: "circle" }))}
                    className="flex-1"
                  >
                    <Circle className="w-4 h-4 mr-2" />
                    Circle
                  </Button>
                  <Button
                    variant={stickerConfig.shape === "square" ? "default" : "outline"}
                    onClick={() => setStickerConfig(c => ({ ...c, shape: "square" }))}
                    className="flex-1"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Square
                  </Button>
                  <Button
                    variant={stickerConfig.shape === "heart" ? "default" : "outline"}
                    onClick={() => setStickerConfig(c => ({ ...c, shape: "heart" }))}
                    className="flex-1"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Heart
                  </Button>
                </div>
              </div>

              <div>
                <Label>Mood</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={stickerConfig.mood === "happy" ? "default" : "outline"}
                    onClick={() => setStickerConfig(c => ({ ...c, mood: "happy" }))}
                    className="flex-1"
                  >
                    <Smile className="w-4 h-4 mr-2" />
                    Happy
                  </Button>
                  <Button
                    variant={stickerConfig.mood === "neutral" ? "default" : "outline"}
                    onClick={() => setStickerConfig(c => ({ ...c, mood: "neutral" }))}
                    className="flex-1"
                  >
                    <Meh className="w-4 h-4 mr-2" />
                    Neutral
                  </Button>
                  <Button
                    variant={stickerConfig.mood === "sad" ? "default" : "outline"}
                    onClick={() => setStickerConfig(c => ({ ...c, mood: "sad" }))}
                    className="flex-1"
                  >
                    <Frown className="w-4 h-4 mr-2" />
                    Sad
                  </Button>
                </div>
              </div>

              <div>
                <Label>Color</Label>
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {["#F2FCE2", "#D946EF", "#F97316", "#0EA5E9", "#9b87f5", "#ffffff"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setStickerConfig(c => ({ ...c, color }))}
                      className={`w-8 h-8 rounded-full border-2 ${
                        stickerConfig.color === color ? "border-gray-900" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label>Sticker Text</Label>
                <Input
                  value={stickerConfig.text}
                  onChange={(e) => setStickerConfig(c => ({ ...c, text: e.target.value }))}
                  placeholder="Add text to your sticker..."
                  maxLength={20}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="gratitude">What are you grateful for today?</Label>
                <Input
                  id="gratitude"
                  placeholder="I'm grateful for..."
                  value={gratitudeText}
                  onChange={(e) => setGratitudeText(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="public"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
                <Label htmlFor="public">Make this public</Label>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => navigate(-1)} className="w-full">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="w-full bg-rose-500 hover:bg-rose-600">
                  Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Create;
