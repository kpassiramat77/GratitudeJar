
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
        <span className="text-6xl transform-gpu transition-transform hover:scale-110 emoji-3d">
          {moodEmojis[config.mood]}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <style>
        {`
          .emoji-3d {
            text-shadow: 
              0 1px 0 #ccc,
              0 2px 0 #c9c9c9,
              0 3px 0 #bbb,
              0 4px 0 #b9b9b9,
              0 5px 0 #aaa,
              0 6px 1px rgba(0,0,0,.1),
              0 0 5px rgba(0,0,0,.1),
              0 1px 3px rgba(0,0,0,.3),
              0 3px 5px rgba(0,0,0,.2),
              0 5px 10px rgba(0,0,0,.25),
              0 10px 10px rgba(0,0,0,.2),
              0 20px 20px rgba(0,0,0,.15);
            transform-style: preserve-3d;
            perspective: 1000px;
            animation: float 6s ease-in-out infinite;
          }

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        `}
      </style>
      
      {renderPreview()}
      
      <div>
        <Label className="text-lg mb-4">How are you feeling?</Label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          <Button
            variant={config.mood === "happy" ? "default" : "outline"}
            onClick={() => onChange({ ...config, mood: "happy", color: "#BAE6FD" })}
            className="flex-1 text-xl flex flex-col items-center p-4 h-auto"
          >
            <span className="emoji-3d text-2xl">{moodEmojis.happy}</span>
            <span className="text-sm mt-1">Happy</span>
          </Button>
          <Button
            variant={config.mood === "excited" ? "default" : "outline"}
            onClick={() => onChange({ ...config, mood: "excited", color: "#E9D5FF" })}
            className="flex-1 text-xl flex flex-col items-center p-4 h-auto"
          >
            <span className="emoji-3d text-2xl">{moodEmojis.excited}</span>
            <span className="text-sm mt-1">Excited</span>
          </Button>
          <Button
            variant={config.mood === "motivated" ? "default" : "outline"}
            onClick={() => onChange({ ...config, mood: "motivated", color: "#FED7AA" })}
            className="flex-1 text-xl flex flex-col items-center p-4 h-auto"
          >
            <span className="emoji-3d text-2xl">{moodEmojis.motivated}</span>
            <span className="text-sm mt-1">Motivated</span>
          </Button>
          <Button
            variant={config.mood === "loved" ? "default" : "outline"}
            onClick={() => onChange({ ...config, mood: "loved", color: "#FBCFE8" })}
            className="flex-1 text-xl flex flex-col items-center p-4 h-auto"
          >
            <span className="emoji-3d text-2xl">{moodEmojis.loved}</span>
            <span className="text-sm mt-1">Loved</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
