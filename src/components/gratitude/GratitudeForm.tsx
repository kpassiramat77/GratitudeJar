
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
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
      role="form"
      aria-label="Gratitude entry form"
    >
      <div className="space-y-2">
        <Label 
          htmlFor="gratitude-text" 
          className="text-base"
        >
          What are you grateful for?
        </Label>
        <Textarea
          id="gratitude-text"
          placeholder="Express your gratitude..."
          value={gratitudeText}
          onChange={(e) => onGratitudeChange(e.target.value)}
          className="min-h-[120px] resize-none text-base"
          aria-required="true"
          aria-invalid={!gratitudeText.trim()}
          aria-describedby="gratitude-hint"
        />
        <span 
          id="gratitude-hint" 
          className="text-sm text-gray-600"
        >
          Write about something you're thankful for today
        </span>
      </div>

      <div className="space-y-4">
        <Button 
          type="submit"
          disabled={!gratitudeText.trim()}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
          aria-label={!gratitudeText.trim() ? "Please write your gratitude before saving" : "Save your gratitude"}
        >
          ✨ Add to my Gratitude Jar
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="w-full text-gray-600 hover:text-gray-800 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
          aria-label="Cancel and go back"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
