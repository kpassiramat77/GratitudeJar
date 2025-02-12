
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  message: string;
  is_ai: boolean;
  created_at: string;
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (user) {
      loadMessages();
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
    const userMessage = message;
    setMessage("");

    try {
      const { data, error } = await supabase.functions.invoke('chat-with-jari', {
        body: { message: userMessage, userId: user.id },
      });

      if (error) throw error;

      // Messages will be loaded automatically through the previous database operations
      await loadMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-teal-50 p-4 pb-24">
      <div className="max-w-md mx-auto">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Chat with Jari</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4">
                {messages.length === 0 && (
                  <div className="bg-gray-100 rounded-lg p-3 mb-2">
                    Hi! I'm Jari, your gratitude assistant. How can I help you today?
                  </div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-2 ${
                      msg.is_ai
                        ? "bg-gray-100 rounded-lg p-3"
                        : "bg-rose-500 text-white rounded-lg p-3 ml-auto max-w-[80%]"
                    }`}
                  >
                    {msg.message}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isLoading}
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
