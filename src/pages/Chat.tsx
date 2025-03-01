
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatTypingIndicator } from "@/components/chat/ChatTypingIndicator";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatWelcomeMessage } from "@/components/chat/ChatWelcomeMessage";

interface Message {
  id: string;
  message: string;
  is_ai: boolean;
  created_at: string;
  session_id?: string;
  session_topic?: string;
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (user) {
      loadMessages();
      // Subscribe to new messages
      const channel = supabase
        .channel('chat_updates')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'conversations',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const newMessage = payload.new as Message;
            setMessages((prev) => [...prev, newMessage]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (data) {
        setMessages(data);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    }
  };

  const handleSend = async () => {
    if (!message.trim() || !user) return;

    setIsLoading(true);
    setIsTyping(true);
    const userMessage = message;
    setMessage("");

    try {
      const { error: insertError } = await supabase
        .from('conversations')
        .insert({
          message: userMessage,
          is_ai: false,
          user_id: user.id
        });

      if (insertError) throw insertError;

      const { error } = await supabase.functions.invoke('chat-with-jari', {
        body: { message: userMessage, userId: user.id },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen app-gradient p-4 md:p-8 pb-24 page-transition">
      <div className="max-w-3xl mx-auto">
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl animate-scale-in dark:bg-gray-800/90 dark:text-white">
          <CardHeader className="border-b dark:border-gray-700">
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center transition-all-fast hover:shadow-md dark:bg-rose-950 dark:text-rose-300">
                <Bot className="h-6 w-6 text-rose-500 dark:text-rose-300" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Chat with Jari</h2>
                <p className="text-sm text-gray-500 font-normal dark:text-gray-400">Your AI gratitude companion</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[70vh] flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-6" role="log" aria-live="polite" aria-label="Chat messages">
                {messages.length === 0 && <ChatWelcomeMessage />}
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {isTyping && <ChatTypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
              
              <ChatInput
                message={message}
                isLoading={isLoading}
                onMessageChange={setMessage}
                onSend={handleSend}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
