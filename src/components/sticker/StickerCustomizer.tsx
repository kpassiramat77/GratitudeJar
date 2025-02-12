
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
  const moodEmojis: Record<Mood, { src: string, alt: string }> = {
    happy: { 
      src: "/lovable-uploads/b50863b3-305a-4ae8-9485-f710dc6919c4.png",
      alt: "Smiling face with sunglasses"
    },
    excited: { 
      src: "/lovable-uploads/ae56e191-06ab-492a-b11a-fadc905e402e.png",
      alt: "Smiling face with halo"
    },
    motivated: { 
      src: "/lovable-uploads/1f0174e4-1340-4ebe-a6d8-9be7358b2de7.png",
      alt: "Smiling face with blushing cheeks"
    },
    loved: { 
      src: "/lovable-uploads/bba73aca-c6eb-4d9f-a5b3-05f58b36fba2.png",
      alt: "Smiling face with hearts"
    }
  };

  const renderPreview = () => {
    return (
      <div 
        className="relative w-28 h-28 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: config.color }}
      >
        <img 
          src={moodEmojis[config.mood].src}
          alt={moodEmojis[config.mood].alt}
          className="w-16 h-16 transform-gpu transition-transform hover:scale-110"
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <style>
        {`
          .mood-button {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 0.75rem;
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
        <Label className="text-base font-medium text-gray-800 mb-2">How are you feeling?</Label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          <button
            className={`mood-button ${config.mood === "happy" ? "selected happy" : ""}`}
            onClick={() => onChange({ ...config, mood: "happy", color: "#BAE6FD" })}
          >
            <img 
              src={moodEmojis.happy.src} 
              alt={moodEmojis.happy.alt}
              className="w-8 h-8 mx-auto mb-1" 
            />
            <span className="text-xs text-gray-600 font-medium">Happy</span>
          </button>
          <button
            className={`mood-button ${config.mood === "excited" ? "selected excited" : ""}`}
            onClick={() => onChange({ ...config, mood: "excited", color: "#E9D5FF" })}
          >
            <img 
              src={moodEmojis.excited.src} 
              alt={moodEmojis.excited.alt}
              className="w-8 h-8 mx-auto mb-1" 
            />
            <span className="text-xs text-gray-600 font-medium">Excited</span>
          </button>
          <button
            className={`mood-button ${config.mood === "motivated" ? "selected motivated" : ""}`}
            onClick={() => onChange({ ...config, mood: "motivated", color: "#FED7AA" })}
          >
            <img 
              src={moodEmojis.motivated.src} 
              alt={moodEmojis.motivated.alt}
              className="w-8 h-8 mx-auto mb-1" 
            />
            <span className="text-xs text-gray-600 font-medium">Motivated</span>
          </button>
          <button
            className={`mood-button ${config.mood === "loved" ? "selected loved" : ""}`}
            onClick={() => onChange({ ...config, mood: "loved", color: "#FBCFE8" })}
          >
            <img 
              src={moodEmojis.loved.src} 
              alt={moodEmojis.loved.alt}
              className="w-8 h-8 mx-auto mb-1" 
            />
            <span className="text-xs text-gray-600 font-medium">Loved</span>
          </button>
        </div>
      </div>
    </div>
  );
};
