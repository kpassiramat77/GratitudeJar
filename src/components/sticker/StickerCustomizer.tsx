
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export type Mood = "happy" | "excited" | "motivated" | "loved";

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
    happy: "😀",
    excited: "🤩",
    motivated: "🥺",
    loved: "🥰"
  };

  const renderPreview = () => {
    return (
      <div 
        className="relative w-40 h-40 mx-auto mb-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: config.color }}
      >
        <span className="text-6xl">{moodEmojis[config.mood]}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderPreview()}
      
      <div>
        <Label className="text-lg mb-4">How are you feeling?</Label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          <Button
            variant={config.mood === "happy" ? "default" : "outline"}
            onClick={() => onChange({ ...config, mood: "happy", color: "#BAE6FD" })}
            className="flex-1 text-xl flex flex-col items-center p-4 h-auto"
          >
            {moodEmojis.happy}
            <span className="text-sm mt-1">Happy</span>
          </Button>
          <Button
            variant={config.mood === "excited" ? "default" : "outline"}
            onClick={() => onChange({ ...config, mood: "excited", color: "#E9D5FF" })}
            className="flex-1 text-xl flex flex-col items-center p-4 h-auto"
          >
            {moodEmojis.excited}
            <span className="text-sm mt-1">Excited</span>
          </Button>
          <Button
            variant={config.mood === "motivated" ? "default" : "outline"}
            onClick={() => onChange({ ...config, mood: "motivated", color: "#FED7AA" })}
            className="flex-1 text-xl flex flex-col items-center p-4 h-auto"
          >
            {moodEmojis.motivated}
            <span className="text-sm mt-1">Motivated</span>
          </Button>
          <Button
            variant={config.mood === "loved" ? "default" : "outline"}
            onClick={() => onChange({ ...config, mood: "loved", color: "#FBCFE8" })}
            className="flex-1 text-xl flex flex-col items-center p-4 h-auto"
          >
            {moodEmojis.loved}
            <span className="text-sm mt-1">Loved</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
