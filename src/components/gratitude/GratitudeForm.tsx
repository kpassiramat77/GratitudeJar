
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  onGratitudeChange,
  onSubmit
}: GratitudeFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-lg">What are you grateful for?</Label>
        <Textarea
          placeholder="Express your gratitude..."
          value={gratitudeText}
          onChange={(e) => onGratitudeChange(e.target.value)}
          className="min-h-[120px] resize-none text-base"
        />
      </div>

      <Button 
        onClick={onSubmit} 
        className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6"
      >
        Add to my Gratitude Jar
      </Button>
    </div>
  );
};
