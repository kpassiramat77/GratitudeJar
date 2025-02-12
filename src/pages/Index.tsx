
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Heart, Send, Star, Smile, Gift, Flower, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

const samplePrompts = [
  "I'm grateful for...",
  "Today's highlight was...",
  "A small win today...",
  "Someone who made me smile...",
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-teal-50 p-4 pb-24">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center pt-8 space-y-4">
          <div className="flex justify-center">
            <Star className="h-12 w-12 text-rose-500 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">GratitudeJar</h1>
          <p className="text-gray-600 text-lg">Capture life's precious moments ✨</p>
        </div>

        {/* Animated Jar */}
        <div className="relative h-64 flex items-center justify-center">
          {/* Jar Container */}
          <div className="relative w-48 h-48 bg-white/30 backdrop-blur-sm rounded-3xl border-2 border-white/50 shadow-xl overflow-hidden">
            {/* Floating Stickers */}
            <div className="absolute top-4 left-4 animate-bounce">
              <Heart className="h-6 w-6 text-rose-400" />
            </div>
            <div className="absolute top-8 right-6 animate-bounce delay-100">
              <Gift className="h-6 w-6 text-purple-400" />
            </div>
            <div className="absolute bottom-12 left-8 animate-bounce delay-200">
              <Flower className="h-6 w-6 text-pink-400" />
            </div>
            <div className="absolute bottom-8 right-8 animate-bounce delay-300">
              <Leaf className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
              <Smile className="h-8 w-8 text-amber-400" />
            </div>
            
            {/* Prompts Carousel */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <div className="animate-slide-up">
                {samplePrompts.map((prompt, index) => (
                  <p 
                    key={index}
                    className="text-sm text-gray-600 font-medium opacity-0 animate-fade-in"
                    style={{ 
                      animationDelay: `${index * 2}s`,
                      animationDuration: '4s',
                      animationIterationCount: 'infinite' 
                    }}
                  >
                    {prompt}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smile className="h-5 w-5 text-rose-500" />
              Today's Gratitude
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={() => navigate('/create')} 
              className="w-full bg-rose-500 hover:bg-rose-600 shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Entry
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/jar')}
                className="w-full border-2 hover:bg-rose-50 hover:border-rose-200 transition-colors"
              >
                <Heart className="mr-2 h-4 w-4 text-rose-500" />
                View Jar
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/chat')}
                className="w-full border-2 hover:bg-rose-50 hover:border-rose-200 transition-colors"
              >
                <Send className="mr-2 h-4 w-4 text-rose-500" />
                Chat with Jari
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          Start your gratitude journey today
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-40px); }
        }
        
        @keyframes fade-in {
          0%, 100% { opacity: 0; }
          25%, 75% { opacity: 1; }
        }
        
        .animate-slide-up {
          animation: slide-up 8s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Index;
