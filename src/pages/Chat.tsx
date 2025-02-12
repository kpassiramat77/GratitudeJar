
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Bot } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

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
            // Add new message directly instead of reloading all messages
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
      // Insert user message first
      const { error: insertError } = await supabase
        .from('conversations')
        .insert({
          message: userMessage,
          is_ai: false,
          user_id: user.id
        });

      if (insertError) throw insertError;

      // Then call the AI function
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-teal-50 p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-rose-500" />
              Chat with Jari
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-rose-500" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-4 max-w-[85%]">
                      <p className="text-gray-800">
                        Hi! I'm Jari, your gratitude assistant. I'm here to help you cultivate positivity and process your thoughts. How can I support you today?
                      </p>
                    </div>
                  </div>
                )}
                {messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex items-start space-x-3",
                      msg.is_ai ? "justify-start" : "justify-end space-x-reverse"
                    )}
                  >
                    {msg.is_ai && (
                      <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-rose-500" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl p-4 max-w-[85%] relative group",
                        msg.is_ai 
                          ? "bg-gray-100 text-gray-800" 
                          : "bg-rose-500 text-white"
                      )}
                    >
                      <p className="mb-1">{msg.message}</p>
                      <div 
                        className={cn(
                          "text-xs opacity-70",
                          msg.is_ai ? "text-gray-500" : "text-rose-50"
                        )}
                      >
                        {formatDate(msg.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-rose-500" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSend} 
                    className="bg-rose-500 hover:bg-rose-600"
                    disabled={isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
