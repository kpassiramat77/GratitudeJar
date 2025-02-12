
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type Mood = "happy" | "sad" | "neutral";

export interface StickerConfig {
  mood: Mood;
  color: string;
  text: string;
}

interface StickerCustomizerProps {
  config: StickerConfig;
  onChange: (newConfig: StickerConfig) => void;
}

export const StickerCustomizer = ({ config, onChange }: StickerCustomizerProps) => {
  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    neutral: "😐"
  };

  const renderPreview = () => {
    return (
      <div 
        className="relative w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center"
        style={{ backgroundColor: config.color }}
      >
        <span className="text-5xl">{moodEmojis[config.mood]}</span>
        {config.text && (
          <div className="absolute bottom-2 left-0 right-0 text-center text-sm font-medium truncate px-2">
            {config.text}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderPreview()}
      
      <div className="space-y-4">
        <div>
          <Label>Mood</Label>
          <div className="flex gap-2 mt-2">
            <Button
              variant={config.mood === "happy" ? "default" : "outline"}
              onClick={() => onChange({ ...config, mood: "happy" })}
              className="flex-1 text-xl"
            >
              😊 Happy
            </Button>
            <Button
              variant={config.mood === "neutral" ? "default" : "outline"}
              onClick={() => onChange({ ...config, mood: "neutral" })}
              className="flex-1 text-xl"
            >
              😐 Neutral
            </Button>
            <Button
              variant={config.mood === "sad" ? "default" : "outline"}
              onClick={() => onChange({ ...config, mood: "sad" })}
              className="flex-1 text-xl"
            >
              😢 Sad
            </Button>
          </div>
        </div>

        <div>
          <Label>Color</Label>
          <div className="grid grid-cols-6 gap-2 mt-2">
            {["#F2FCE2", "#D946EF", "#F97316", "#0EA5E9", "#9b87f5", "#ffffff"].map((color) => (
              <button
                key={color}
                onClick={() => onChange({ ...config, color })}
                className={`w-8 h-8 rounded-full border-2 ${
                  config.color === color ? "border-gray-900" : "border-gray-200"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div>
          <Label>Sticker Text</Label>
          <Input
            value={config.text}
            onChange={(e) => onChange({ ...config, text: e.target.value })}
            placeholder="Add text to your sticker..."
            maxLength={20}
          />
        </div>
      </div>
    </div>
  );
};
