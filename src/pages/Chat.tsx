
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatTypingIndicator } from "@/components/chat/ChatTypingIndicator";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatWelcomeMessage } from "@/components/chat/ChatWelcomeMessage";
import { v4 as uuidv4 } from "uuid";

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
  const [sessionId] = useState(() => uuidv4());
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    setIsTyping(true);
    const userMessage = message;
    setMessage("");

    // Create a unique ID for the message
    const messageId = uuidv4();
    
    // Add user message to the local state immediately
    const newUserMessage = {
      id: messageId,
      message: userMessage,
      is_ai: false,
      created_at: new Date().toISOString(),
      session_id: sessionId
    };
    
    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse = {
          id: uuidv4(),
          message: "Thank you for sharing. It's wonderful to reflect on the things we're grateful for. Is there anything else you'd like to share?",
          is_ai: true,
          created_at: new Date().toISOString(),
          session_id: sessionId
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
        setIsTyping(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen app-gradient p-4 md:p-8 pb-24">
      <div className="max-w-3xl mx-auto">
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center">
                <Bot className="h-6 w-6 text-rose-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Chat with Jari</h2>
                <p className="text-sm text-gray-500 font-normal">Your AI gratitude companion</p>
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
