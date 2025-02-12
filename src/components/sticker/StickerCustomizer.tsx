
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
    happy: "😃",
    excited: "🤩",
    motivated: "🥺",
    loved: "🥰"
  };

  const renderPreview = () => {
    return (
      <div 
        className="relative w-40 h-40 mx-auto mb-8 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: config.color }}
      >
        <span className="text-6xl emoji-3d transform-gpu transition-transform hover:scale-110">
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

          .mood-button {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 1rem;
            transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }

          .mood-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }

          .mood-button.selected {
            background: #f0f9ff;
            border-color: #bae6fd;
          }

          .mood-button.selected.happy { background: #BAE6FD; }
          .mood-button.selected.excited { background: #E9D5FF; }
          .mood-button.selected.motivated { background: #FED7AA; }
          .mood-button.selected.loved { background: #FBCFE8; }
        `}
      </style>
      
      {renderPreview()}
      
      <div>
        <Label className="text-xl font-medium text-gray-800 mb-4">How are you feeling?</Label>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <button
            className={`mood-button ${config.mood === "happy" ? "selected happy" : ""}`}
            onClick={() => onChange({ ...config, mood: "happy", color: "#BAE6FD" })}
          >
            <span className="emoji-3d text-3xl block mb-2">{moodEmojis.happy}</span>
            <span className="text-sm text-gray-600 font-medium">Happy</span>
          </button>
          <button
            className={`mood-button ${config.mood === "excited" ? "selected excited" : ""}`}
            onClick={() => onChange({ ...config, mood: "excited", color: "#E9D5FF" })}
          >
            <span className="emoji-3d text-3xl block mb-2">{moodEmojis.excited}</span>
            <span className="text-sm text-gray-600 font-medium">Excited</span>
          </button>
          <button
            className={`mood-button ${config.mood === "motivated" ? "selected motivated" : ""}`}
            onClick={() => onChange({ ...config, mood: "motivated", color: "#FED7AA" })}
          >
            <span className="emoji-3d text-3xl block mb-2">{moodEmojis.motivated}</span>
            <span className="text-sm text-gray-600 font-medium">Motivated</span>
          </button>
          <button
            className={`mood-button ${config.mood === "loved" ? "selected loved" : ""}`}
            onClick={() => onChange({ ...config, mood: "loved", color: "#FBCFE8" })}
          >
            <span className="emoji-3d text-3xl block mb-2">{moodEmojis.loved}</span>
            <span className="text-sm text-gray-600 font-medium">Loved</span>
          </button>
        </div>
      </div>
    </div>
  );
};
