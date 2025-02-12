
import type { Json } from "@/integrations/supabase/types";
import type { StickerConfig } from "@/components/sticker/StickerCustomizer";

export const stickerConfigToJson = (config: StickerConfig): Json => {
  return {
    shape: config.shape,
    mood: config.mood,
    color: config.color,
    text: config.text
  };
};
