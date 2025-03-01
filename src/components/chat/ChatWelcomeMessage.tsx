
import { Bot } from "lucide-react";

export const ChatWelcomeMessage = () => {
  return (
    <div className="flex items-start space-x-3 animate-fade-in" role="listitem">
      <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center transition-all-fast hover:shadow-md dark:bg-rose-950 dark:text-rose-300">
        <Bot className="h-6 w-6 text-rose-500 dark:text-rose-300" />
      </div>
      <div className="bg-gray-100 rounded-2xl p-6 max-w-[85%] shadow-sm card-hover dark:bg-gray-800 dark:text-gray-100">
        <p className="text-gray-800 text-lg leading-relaxed dark:text-gray-100">
          Hi! I'm Jari, your gratitude assistant. I'm here to help you cultivate positivity and process your thoughts. How can I support you today?
        </p>
      </div>
    </div>
  );
};
