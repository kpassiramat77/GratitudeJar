
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

const Create = () => {
  const [gratitudeText, setGratitudeText] = useState("");
  const [isPublic, setIsPublic] = useState(false);
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
          user_id: user.id
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
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Create;
