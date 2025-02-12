
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface GratitudeFormProps {
  gratitudeText: string;
  isPublic: boolean;
  onGratitudeChange: (text: string) => void;
  onPublicChange: (isPublic: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const GratitudeForm = ({
  gratitudeText,
  isPublic,
  onGratitudeChange,
  onPublicChange,
  onSubmit,
  onCancel
}: GratitudeFormProps) => {
  return (
    <div className="space-y-4 pt-4 border-t">
      <div className="space-y-2">
        <Label htmlFor="gratitude">What are you grateful for today?</Label>
        <Input
          id="gratitude"
          placeholder="I'm grateful for..."
          value={gratitudeText}
          onChange={(e) => onGratitudeChange(e.target.value)}
          className="min-h-[80px] resize-none py-2"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="public"
          checked={isPublic}
          onCheckedChange={onPublicChange}
        />
        <Label htmlFor="public">Make this public</Label>
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" onClick={onCancel} className="w-full">
          Cancel
        </Button>
        <Button onClick={onSubmit} className="w-full bg-rose-500 hover:bg-rose-600">
          Save
        </Button>
      </div>
    </div>
  );
};
