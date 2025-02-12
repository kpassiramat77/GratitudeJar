
import { Bot } from "lucide-react";

export const ChatTypingIndicator = () => {
  return (
    <div className="flex items-start space-x-3 animate-fade-in">
      <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center">
        <Bot className="h-6 w-6 text-rose-500" />
      </div>
      <div className="bg-gray-100 rounded-2xl p-4 shadow-sm">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
};
