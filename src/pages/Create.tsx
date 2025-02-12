
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const Create = () => {
  const [gratitudeText, setGratitudeText] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!gratitudeText.trim()) {
      toast({
        title: "Cannot save empty gratitude",
        description: "Please write something you're grateful for",
        variant: "destructive",
      });
      return;
    }

    // TODO: Save to database
    toast({
      title: "Gratitude saved",
      description: "Your gratitude has been added to your jar",
    });
    navigate("/jar");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-teal-50 p-4">
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
