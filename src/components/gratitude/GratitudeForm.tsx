
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
  isPublic,
  onGratitudeChange,
  onPublicChange,
  onSubmit,
  onCancel
}: GratitudeFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base">What are you grateful for?</Label>
        <Textarea
          placeholder="Express your gratitude..."
          value={gratitudeText}
          onChange={(e) => onGratitudeChange(e.target.value)}
          className="min-h-[120px] resize-none text-base"
        />
      </div>

      <div className="space-y-4">
        <Button 
          onClick={onSubmit} 
          disabled={!gratitudeText.trim()}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✨ Add to my Gratitude Jar
        </Button>
        
        <Button
          variant="ghost"
          onClick={onCancel}
          className="w-full text-gray-600 hover:text-gray-800"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
