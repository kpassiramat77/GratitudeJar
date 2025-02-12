
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const Chat = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    // TODO: Implement chat with AI
    console.log("Sending message:", message);
    setMessage("");
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
                <div className="bg-gray-100 rounded-lg p-3 mb-2">
                  Hi! I'm Jari, your gratitude assistant. How can I help you today?
                </div>
              </div>
              
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button onClick={handleSend} className="bg-rose-500 hover:bg-rose-600">
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
