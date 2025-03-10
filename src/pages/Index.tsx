
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Heart, Send, Star, Smile, Gift, Flower, Leaf, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const samplePrompts = [
  "I'm grateful for...",
  "Today's highlight was...",
  "A small win today...",
  "Someone who made me smile...",
];

const moodEmojis = {
  happy: { 
    src: "/lovable-uploads/bbc2aca1-7202-42ce-8f8a-b82acb73be82.png",
    alt: "Smiling face with sunglasses",
  },
  excited: { 
    src: "/lovable-uploads/855693cd-9b32-4aa4-847f-721315c226fe.png",
    alt: "Excited face with halo",
  },
  loved: { 
    src: "/lovable-uploads/fb3c5db8-5a82-46cc-b05f-01beed3c07ca.png",
    alt: "Face with hearts",
  },
  peaceful: { 
    src: "/lovable-uploads/0026f39f-8263-45dc-bccf-4de6a340040c.png",
    alt: "Peaceful smiling face",
  },
  grateful: { 
    src: "/lovable-uploads/65f8700a-195d-4b4f-b8ae-73c0cac09a5c.png",
    alt: "Grateful smiling face",
  }
};

const sampleNotes = [
  { mood: 'happy', text: "Family dinner" },
  { mood: 'excited', text: "A kind surprise" },
  { mood: 'loved', text: "Garden blooming" },
  { mood: 'peaceful', text: "Peaceful walk" },
  { mood: 'grateful', text: "Friend's laugh" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen app-gradient p-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="text-center pt-2 space-y-2 relative">
          <button
            onClick={() => navigate('/profile')}
            className="absolute right-0 top-0 p-2 text-gray-600 hover:text-rose-500 transition-colors"
          >
            <User className="h-6 w-6" />
          </button>
          <div className="flex justify-center">
            <Star className="h-8 w-8 text-rose-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">GratitudeJar</h1>
          <p className="text-gray-600">Capture life's precious moments ✨</p>
        </div>

        <div className="relative h-72 flex items-center justify-center">
          <div className="relative w-48 h-64 group">
            <div className="absolute inset-0 rounded-jar bg-white/10 backdrop-blur-md shadow-lg">
              <div className="absolute inset-0 rounded-jar bg-gradient-to-r from-white/40 via-transparent to-white/40"></div>
              <div className="absolute inset-0 rounded-jar bg-gradient-to-b from-white/30 via-transparent to-white/20"></div>
              <div className="absolute inset-0 rounded-jar border border-white/30"></div>
              
              <div className="absolute -top-3 left-0 right-0 h-6">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-t-3xl">
                  <div className="absolute inset-x-0 top-1 h-0.5 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"></div>
                  <div className="absolute inset-x-0 bottom-1 h-0.5 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"></div>
                </div>
                <div className="absolute inset-x-0 top-0 h-full flex justify-around items-center overflow-hidden">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-0.5 h-full bg-gray-400/30 transform -skew-x-12"></div>
                  ))}
                </div>
              </div>

              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-6">
                <div className="absolute w-full h-0.5 bg-amber-700/80 top-1/2 -translate-y-1/2"></div>
                <div className="absolute w-3 h-3 border-2 border-amber-700/80 rounded-full left-1/2 -translate-x-1/2 transform rotate-45"></div>
                <div className="absolute w-2 h-4 border-2 border-amber-700/80 rounded-full left-1/2 -translate-x-1/2 -translate-y-1"></div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/2 w-36 h-8 bg-gradient-to-r from-rose-50 via-white to-rose-50 backdrop-blur-md flex items-center justify-center transform -rotate-2 rounded-xl border border-rose-100 shadow-sm z-20">
                <div className="text-gray-900 text-center font-['Comic_Sans_MS'] flex items-center gap-1 px-2">
                  <span className="text-base font-medium">Gratitude Jar</span>
                  <Heart className="h-3.5 w-3.5 text-rose-500" />
                </div>
              </div>

              {sampleNotes.map((note, index) => {
                const positions = [
                  "bottom-6 left-4",
                  "bottom-8 right-4",
                  "bottom-16 left-8",
                  "bottom-20 right-8",
                  "bottom-24 left-1/2 -translate-x-1/2",
                ];
                
                return (
                  <div
                    key={index}
                    className={`absolute ${positions[index]} animate-float z-10`}
                    style={{ 
                      animationDelay: `${index * 0.5}s`,
                      animationDuration: '3s'
                    }}
                  >
                    <div className="bg-white/90 p-2 rounded-lg shadow-lg backdrop-blur-sm border border-white/50 transform transition-transform hover:scale-110">
                      <div className="flex items-center gap-1">
                        <img 
                          src={moodEmojis[note.mood as keyof typeof moodEmojis].src}
                          alt={moodEmojis[note.mood as keyof typeof moodEmojis].alt}
                          className="w-4 h-4 object-contain"
                        />
                        <span className="text-xs font-medium text-gray-700">{note.text}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="py-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Smile className="h-4 w-4 text-rose-500" />
              Today's Gratitude
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pb-4">
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
                <Heart className="mr-2 h-3 w-3 text-rose-500" />
                View Jar
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/chat')}
                className="w-full border-2 hover:bg-rose-50 hover:border-rose-200 transition-colors"
              >
                <Send className="mr-2 h-3 w-3 text-rose-500" />
                Chat with Jari
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-gray-500">
          Start your gratitude journey today
        </div>
      </div>

      <style>{`
        .rounded-jar {
          border-radius: 3rem 3rem 2.5rem 2.5rem;
          transform: perspective(1000px) rotateY(-5deg);
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Index;
