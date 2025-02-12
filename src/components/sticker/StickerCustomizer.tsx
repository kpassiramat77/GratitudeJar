
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export type Mood = "accomplished" | "blessed" | "content" | "excited" | "grateful" | "happy" | "hopeful" | "inspired" | "loved" | "motivated" | "peaceful" | "proud" | "unsure";

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
    accomplished: { 
      src: "/lovable-uploads/bbc2aca1-7202-42ce-8f8a-b82acb73be82.png",
      alt: "Accomplished face with sunglasses",
      color: "#BAE6FD"
    },
    blessed: { 
      src: "/lovable-uploads/7071ed02-3767-43a2-8e02-7d93301373ed.png",
      alt: "Blessed smiling face with halo",
      color: "#A5B4FC"
    },
    content: { 
      src: "/lovable-uploads/449b5720-4357-47a3-80a3-263a31713025.png",
      alt: "Content smiling face",
      color: "#93C5FD"
    },
    excited: { 
      src: "/lovable-uploads/855693cd-9b32-4aa4-847f-721315c226fe.png",
      alt: "Excited face with star eyes",
      color: "#E9D5FF"
    },
    grateful: {
      src: "/lovable-uploads/65f8700a-195d-4b4f-b8ae-73c0cac09a5c.png",
      alt: "Grateful face with hearts",
      color: "#DDD6FE"
    },
    happy: {
      src: "/lovable-uploads/6304d2fb-0064-47aa-9fdd-7c9f2fd99cdd.png",
      alt: "Happy smiling face",
      color: "#FDE68A"
    },
    hopeful: {
      src: "/lovable-uploads/5e3faeda-08d8-496a-b248-b8e08e4d970f.png",
      alt: "Hopeful face",
      color: "#FFDBB5"
    },
    inspired: {
      src: "/lovable-uploads/4388b5e6-bdd5-438e-9601-b361d8af7032.png",
      alt: "Inspired face with tongue out",
      color: "#C4B5FD"
    },
    loved: {
      src: "/lovable-uploads/fb3c5db8-5a82-46cc-b05f-01beed3c07ca.png",
      alt: "Loved face with hearts",
      color: "#FBCFE8"
    },
    motivated: {
      src: "/lovable-uploads/c08d6f70-fd9b-4093-b99a-2ce4b8018112.png",
      alt: "Motivated face with steam",
      color: "#FED7AA"
    },
    peaceful: {
      src: "/lovable-uploads/0026f39f-8263-45dc-bccf-4de6a340040c.png",
      alt: "Peaceful smiling face",
      color: "#BBF7D0"
    },
    proud: {
      src: "/lovable-uploads/cb090a50-8c08-43c4-9b85-f7559cc42fcb.png",
      alt: "Proud party face",
      color: "#FDA4AF"
    },
    unsure: {
      src: "/lovable-uploads/6aa6af5a-86f9-4a5a-a113-04aee059f525.png",
      alt: "Unsure thinking face",
      color: "#FCA5A5"
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
          className="w-24 h-24 object-contain transform-gpu transition-transform hover:scale-110 relative z-10"
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
