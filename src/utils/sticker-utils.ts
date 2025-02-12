
import type { Json } from "@/integrations/supabase/types";
import type { StickerConfig } from "@/components/sticker/StickerCustomizer";

export const stickerConfigToJson = (config: StickerConfig): Json => {
  return {
    mood: config.mood,
    color: config.color,
    text: config.text
  };
};
