
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  message: string;
  isLoading: boolean;
  onMessageChange: (message: string) => void;
  onSend: () => void;
}

export const ChatInput = ({ message, isLoading, onMessageChange, onSend }: ChatInputProps) => {
  return (
    <div className="border-t p-4 bg-white/50 backdrop-blur-sm">
      <div className="flex space-x-3 max-w-3xl mx-auto">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && onSend()}
          disabled={isLoading}
          className="flex-1 bg-white border-gray-200 focus:ring-rose-200"
        />
        <Button 
          onClick={onSend} 
          className={cn(
            "bg-rose-500 hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
          disabled={isLoading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
