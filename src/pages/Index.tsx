
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Heart, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-teal-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">GratitudeJar</h1>
          <p className="text-gray-600">Capture your moments of gratitude</p>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Today's Gratitude</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => navigate('/create')} 
              className="w-full bg-rose-500 hover:bg-rose-600"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Entry
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/jar')}
                className="w-full"
              >
                <Heart className="mr-2 h-4 w-4" />
                View Jar
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/chat')}
                className="w-full"
              >
                <Send className="mr-2 h-4 w-4" />
                Chat with Jari
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
