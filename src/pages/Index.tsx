
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

const sampleNotes = [
  { icon: Heart, text: "Family dinner", color: "bg-[#ffffff1a]" },
  { icon: Gift, text: "A kind surprise", color: "bg-[#ffffff1a]" },
  { icon: Flower, text: "Garden blooming", color: "bg-[#ffffff1a]" },
  { icon: Leaf, text: "Peaceful walk", color: "bg-[#ffffff1a]" },
  { icon: Smile, text: "Friend's laugh", color: "bg-[#ffffff1a]" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#274958,#d18a75)] p-4 pb-24">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center pt-8 space-y-4">
          <div className="flex justify-center">
            <Star className="h-12 w-12 text-[#ffd700] animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">GratitudeJar</h1>
          <p className="text-[#ffffffcc] text-lg">Capture life's precious moments ✨</p>
        </div>

        {/* Realistic Jar */}
        <div className="relative h-80 flex items-center justify-center">
          {/* Jar Container */}
          <div className="relative w-56 h-64">
            {/* Jar Lid */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-gradient-to-r from-[#ffffff40] via-[#ffffff80] to-[#ffffff40] rounded-t-xl border border-[#ffffff30] z-20 shadow-lg backdrop-blur-sm">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-[#ffffff20] via-[#ffffff60] to-[#ffffff20] rounded-full"></div>
            </div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-40 h-4 bg-gradient-to-r from-[#ffffff40] via-[#ffffff80] to-[#ffffff40] rounded-t-3xl border border-[#ffffff30] shadow-lg backdrop-blur-sm"></div>
            
            {/* Jar Body */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-56 bg-[#ffffff1a] backdrop-blur-md rounded-2xl overflow-hidden shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] border border-[#ffffff30]">
              {/* Glass Reflections */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"></div>
              <div className="absolute top-0 left-1/4 w-1 h-full bg-[#ffffff30]"></div>
              <div className="absolute top-0 right-1/4 w-1 h-full bg-[#ffffff30]"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(255,255,255,0.1)_100%)]"></div>
              
              {/* Floating Note Stickers */}
              {sampleNotes.map((note, index) => {
                const Icon = note.icon;
                const positions = [
                  "top-4 left-4",
                  "top-8 right-6",
                  "bottom-20 left-8",
                  "bottom-12 right-8",
                  "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                ];
                return (
                  <div
                    key={index}
                    className={`absolute ${positions[index]} transform rotate-${Math.floor(Math.random() * 20) - 10} animate-bounce`}
                    style={{ 
                      animationDuration: '3s',
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <div className={`${note.color} p-2 rounded-lg shadow-lg backdrop-blur-md border border-[#ffffff30] transform transition-transform hover:scale-110`}>
                      <div className="flex items-center gap-1">
                        <Icon className="h-4 w-4 text-white" />
                        <span className="text-xs font-medium text-white">{note.text}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Prompts Carousel */}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="animate-slide-up">
                  {samplePrompts.map((prompt, index) => (
                    <p 
                      key={index}
                      className="text-sm text-white font-medium opacity-0 animate-fade-in drop-shadow-md"
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

            {/* Jar Base */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-[#ffffff40] via-[#ffffff80] to-[#ffffff40] rounded-b-lg border border-[#ffffff30] shadow-lg"></div>
            
            {/* Jar Thread Detail */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-44 h-44 border-2 border-[#ffffff20] rounded-full pointer-events-none"></div>
          </div>
        </div>

        <Card className="border-0 shadow-xl bg-[#ffffff0d] backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Smile className="h-5 w-5 text-[#ffd700]" />
              Today's Gratitude
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={() => navigate('/create')} 
              className="w-full bg-[#d18a75] hover:bg-[#c07a65] shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-0.5"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Entry
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/jar')}
                className="w-full border-2 border-[#ffffff30] bg-[#ffffff0d] hover:bg-[#ffffff1a] text-white transition-colors"
              >
                <Heart className="mr-2 h-4 w-4 text-[#ffd700]" />
                View Jar
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/chat')}
                className="w-full border-2 border-[#ffffff30] bg-[#ffffff0d] hover:bg-[#ffffff1a] text-white transition-colors"
              >
                <Send className="mr-2 h-4 w-4 text-[#ffd700]" />
                Chat with Jari
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-[#ffffffcc]">
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
