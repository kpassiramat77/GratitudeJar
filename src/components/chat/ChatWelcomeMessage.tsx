
import { Bot } from "lucide-react";

export const ChatWelcomeMessage = () => {
  return (
    <div className="flex items-start space-x-3 animate-fade-in">
      <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center">
        <Bot className="h-6 w-6 text-rose-500" />
      </div>
      <div className="bg-gray-100 rounded-2xl p-6 max-w-[85%] shadow-sm">
        <p className="text-gray-800 text-lg leading-relaxed">
          Hi! I'm Jari, your gratitude assistant. I'm here to help you cultivate positivity and process your thoughts. How can I support you today?
        </p>
      </div>
    </div>
  );
};
