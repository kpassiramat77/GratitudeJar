
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";
import { useState } from "react";

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
  const [showTimestamp, setShowTimestamp] = useState(false);
  
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
      onMouseEnter={() => setShowTimestamp(true)}
      onMouseLeave={() => setShowTimestamp(false)}
      role="listitem"
    >
      {message.is_ai && (
        <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center transition-all-fast hover:shadow-md dark:bg-rose-950 dark:text-rose-300" aria-hidden="true">
          <Bot className="h-6 w-6 text-rose-500 dark:text-rose-300" />
        </div>
      )}
      <div
        className={cn(
          "rounded-2xl p-4 max-w-[85%] relative group transition-all-fast card-hover",
          message.is_ai 
            ? "bg-gray-100 text-gray-800 animate-slide-in-left dark:bg-gray-800 dark:text-gray-100" 
            : "bg-rose-500 text-white animate-slide-in-right dark:bg-rose-600"
        )}
      >
        <p className={cn(
          "text-base leading-relaxed mb-2",
          message.is_ai ? "text-gray-700 dark:text-gray-200" : "text-white"
        )}>
          {message.message}
        </p>
        <div 
          className={cn(
            "text-xs transition-opacity",
            showTimestamp ? "opacity-100" : "opacity-50",
            message.is_ai ? "text-gray-500 dark:text-gray-400" : "text-rose-100"
          )}
          aria-label="Message sent at"
        >
          {formatDate(message.created_at)}
        </div>
      </div>
    </div>
  );
};
