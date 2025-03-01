
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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
  const [isFocused, setIsFocused] = useState(false);
  const characterCount = gratitudeText.length;
  const isValid = gratitudeText.trim().length > 0;

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        if (isValid) onSubmit();
      }}
      className="space-y-3 animate-fade-in"
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`min-h-[80px] resize-none text-base transition-all duration-200 ${isFocused ? 'shadow-md border-rose-300' : ''}`}
          aria-required="true"
          aria-invalid={!gratitudeText.trim()}
          aria-describedby="gratitude-hint gratitude-count"
        />
        <div className="flex justify-between items-center text-sm">
          <span 
            id="gratitude-hint" 
            className="text-gray-600"
          >
            Write about something you're thankful for today
          </span>
          <span 
            id="gratitude-count"
            className={`text-xs ${characterCount > 280 ? 'text-rose-500' : 'text-gray-500'}`}
          >
            {characterCount}/300
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          type="submit"
          disabled={!isValid}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
          aria-label={!isValid ? "Please write your gratitude before saving" : "Save your gratitude"}
        >
          ✨ Add to my Gratitude Jar
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="w-full text-gray-600 hover:text-gray-800 focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
          aria-label="Cancel and go back"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
