
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

interface Message {
  id: string;
  message: string;
  is_ai: boolean;
  created_at: string;
  session_id?: string;
  session_topic?: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={cn(
        "flex items-start space-x-3 animate-fade-in",
        message.is_ai ? "justify-start" : "justify-end space-x-reverse"
      )}
    >
      {message.is_ai && (
        <div className="h-10 w-10 rounded-full bg-[#F4E7FF] flex items-center justify-center">
          <Bot className="h-6 w-6 text-purple-600" />
        </div>
      )}
      <div
        className={cn(
          "rounded-2xl p-4 max-w-[85%] relative group shadow-sm",
          message.is_ai 
            ? "bg-[#F4E7FF]/50 text-purple-900" 
            : "bg-[#E8FFF9] text-purple-900"
        )}
      >
        <p className={cn(
          "text-base leading-relaxed mb-2",
          message.is_ai ? "text-purple-900" : "text-purple-900"
        )}>{message.message}</p>
        <div 
          className={cn(
            "text-xs",
            message.is_ai ? "text-purple-600" : "text-purple-600"
          )}
        >
          {formatDate(message.created_at)}
        </div>
      </div>
    </div>
  );
};
