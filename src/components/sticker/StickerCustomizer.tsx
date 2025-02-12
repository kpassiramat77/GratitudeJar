
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export type Mood = "happy" | "excited" | "motivated" | "loved" | "peaceful" | "grateful" | "confident" | "blessed" | "joyful" | "optimistic" | "energetic" | "content" | "inspired";

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
  const moodEmojis: Record<Mood, { src: string, alt: string, color: string }> = {
    happy: { 
      src: "/lovable-uploads/b50863b3-305a-4ae8-9485-f710dc6919c4.png",
      alt: "Smiling face with sunglasses",
      color: "#BAE6FD"
    },
    excited: { 
      src: "/lovable-uploads/ae56e191-06ab-492a-b11a-fadc905e402e.png",
      alt: "Smiling face with halo",
      color: "#E9D5FF"
    },
    motivated: { 
      src: "/lovable-uploads/1f0174e4-1340-4ebe-a6d8-9be7358b2de7.png",
      alt: "Smiling face with blushing cheeks",
      color: "#FED7AA"
    },
    loved: { 
      src: "/lovable-uploads/bba73aca-c6eb-4d9f-a5b3-05f58b36fba2.png",
      alt: "Smiling face with hearts",
      color: "#FBCFE8"
    },
    peaceful: {
      src: "/lovable-uploads/93a79c7e-9492-473f-948f-ef209591f578.png",
      alt: "Peaceful face emoji",
      color: "#BBF7D0"
    },
    grateful: {
      src: "/lovable-uploads/70c0bc6e-907e-434d-b667-6861a15d3ed8.png",
      alt: "Grateful face emoji",
      color: "#DDD6FE"
    },
    confident: {
      src: "/lovable-uploads/8d046852-9c5c-4123-9a4f-fcf28d665439.png",
      alt: "Confident face emoji",
      color: "#FDE68A"
    },
    blessed: {
      src: "/lovable-uploads/0d9eb8bd-825e-4b19-9957-2105c5754d4a.png",
      alt: "Blessed face emoji",
      color: "#A5B4FC"
    },
    joyful: {
      src: "/lovable-uploads/c2c7f613-bf8f-4517-82de-6981817dce57.png",
      alt: "Joyful face emoji",
      color: "#FDA4AF"
    },
    optimistic: {
      src: "/lovable-uploads/78e88de0-2a5c-4880-825f-e75d16c26c48.png",
      alt: "Optimistic face emoji",
      color: "#FFDBB5"
    },
    energetic: {
      src: "/lovable-uploads/4cdaaecd-c8e8-40ad-b984-fce4cc5c55a6.png",
      alt: "Energetic face emoji",
      color: "#FCA5A5"
    },
    content: {
      src: "/lovable-uploads/2a9c0a76-f10a-4f2c-b755-d20d53195002.png",
      alt: "Content face emoji",
      color: "#93C5FD"
    },
    inspired: {
      src: "/lovable-uploads/8b76f102-aa87-4cb2-8c75-fd3bd9f24425.png",
      alt: "Inspired face emoji",
      color: "#C4B5FD"
    }
  };

  const renderPreview = () => {
    return (
      <div 
        className="relative w-36 h-36 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: config.color }}
      >
        <img 
          src={moodEmojis[config.mood].src}
          alt={moodEmojis[config.mood].alt}
          className="w-24 h-24 object-contain transform-gpu transition-transform hover:scale-110"
          onError={(e) => {
            console.error(`Failed to load image: ${moodEmojis[config.mood].src}`);
            e.currentTarget.style.opacity = '0.5';
          }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <style>
        {`
          .mood-button {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 0.75rem;
            transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            min-width: 85px;
            flex-shrink: 0;
          }

          .mood-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }

          .mood-button.selected {
            background: #f0f9ff;
            border-color: #bae6fd;
          }

          .mood-row {
            display: flex;
            gap: 1rem;
            padding: 0.75rem;
          }
        `}
      </style>
      
      {renderPreview()}
      
      <div>
        <Label className="text-base font-medium text-gray-800 mb-2">How are you feeling?</Label>
        <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
          <div className="mood-row">
            {Object.entries(moodEmojis).map(([mood, { src, alt, color }]) => (
              <button
                key={mood}
                className={`mood-button ${config.mood === mood ? "selected" : ""}`}
                style={{ 
                  backgroundColor: config.mood === mood ? color : undefined 
                }}
                onClick={() => onChange({ ...config, mood: mood as Mood, color })}
              >
                <img 
                  src={src} 
                  alt={alt}
                  className="w-12 h-12 mx-auto mb-1.5 object-contain"
                  onError={(e) => {
                    console.error(`Failed to load image: ${src}`);
                    e.currentTarget.style.opacity = '0.5';
                  }}
                />
                <span className="text-xs text-gray-600 font-medium capitalize block">{mood}</span>
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
