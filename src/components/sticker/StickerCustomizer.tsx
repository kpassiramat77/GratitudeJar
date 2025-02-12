
import { Circle, Square, Smile, Frown, Heart, Meh } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type Shape = "circle" | "square" | "heart";
export type Mood = "happy" | "sad" | "neutral";

export interface StickerConfig {
  shape: Shape;
  mood: Mood;
  color: string;
  text: string;
}

interface StickerCustomizerProps {
  config: StickerConfig;
  onChange: (newConfig: StickerConfig) => void;
}

export const StickerCustomizer = ({ config, onChange }: StickerCustomizerProps) => {
  const renderPreview = () => {
    const ShapeComponent = {
      circle: Circle,
      square: Square,
      heart: Heart
    }[config.shape];

    const MoodComponent = {
      happy: Smile,
      sad: Frown,
      neutral: Meh
    }[config.mood];

    return (
      <div 
        className="relative w-32 h-32 mx-auto mb-4"
        style={{ backgroundColor: config.color }}
      >
        <ShapeComponent className="w-full h-full p-2" />
        <MoodComponent className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12" />
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
          <Label>Shape</Label>
          <div className="flex gap-2 mt-2">
            <Button
              variant={config.shape === "circle" ? "default" : "outline"}
              onClick={() => onChange({ ...config, shape: "circle" })}
              className="flex-1"
            >
              <Circle className="w-4 h-4 mr-2" />
              Circle
            </Button>
            <Button
              variant={config.shape === "square" ? "default" : "outline"}
              onClick={() => onChange({ ...config, shape: "square" })}
              className="flex-1"
            >
              <Square className="w-4 h-4 mr-2" />
              Square
            </Button>
            <Button
              variant={config.shape === "heart" ? "default" : "outline"}
              onClick={() => onChange({ ...config, shape: "heart" })}
              className="flex-1"
            >
              <Heart className="w-4 h-4 mr-2" />
              Heart
            </Button>
          </div>
        </div>

        <div>
          <Label>Mood</Label>
          <div className="flex gap-2 mt-2">
            <Button
              variant={config.mood === "happy" ? "default" : "outline"}
              onClick={() => onChange({ ...config, mood: "happy" })}
              className="flex-1"
            >
              <Smile className="w-4 h-4 mr-2" />
              Happy
            </Button>
            <Button
              variant={config.mood === "neutral" ? "default" : "outline"}
              onClick={() => onChange({ ...config, mood: "neutral" })}
              className="flex-1"
            >
              <Meh className="w-4 h-4 mr-2" />
              Neutral
            </Button>
            <Button
              variant={config.mood === "sad" ? "default" : "outline"}
              onClick={() => onChange({ ...config, mood: "sad" })}
              className="flex-1"
            >
              <Frown className="w-4 h-4 mr-2" />
              Sad
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
