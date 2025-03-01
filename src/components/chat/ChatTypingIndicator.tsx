
import { Bot } from "lucide-react";

export const ChatTypingIndicator = () => {
  return (
    <div className="flex items-start space-x-3 animate-fade-in" role="status" aria-label="Jari is typing">
      <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center transition-all-fast hover:shadow-md dark:bg-rose-950 dark:text-rose-300">
        <Bot className="h-6 w-6 text-rose-500 dark:text-rose-300" />
      </div>
      <div className="bg-gray-100 rounded-2xl p-4 shadow-sm card-hover dark:bg-gray-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce dark:bg-gray-500" />
          <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s] dark:bg-gray-500" />
          <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s] dark:bg-gray-500" />
        </div>
      </div>
    </div>
  );
};
