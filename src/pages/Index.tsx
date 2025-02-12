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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-teal-50 p-4 pb-24">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center pt-8 space-y-4">
          <div className="flex justify-center">
            <Star className="h-12 w-12 text-rose-500 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">GratitudeJar</h1>
          <p className="text-gray-600 text-lg">Capture life's precious moments ✨</p>
        </div>

        <div className="relative h-96 flex items-center justify-center perspective-1000">
          <div className="relative w-64 h-80 transform-style-3d rotate-y-[-20deg] hover:rotate-y-0 transition-transform duration-500">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-8 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-t-2xl transform-3d rotate-x-[20deg] z-20 shadow-xl">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 rounded-full"></div>
            </div>
            
            <div className="absolute top-0 left-0 w-full h-full transform-style-3d">
              <div className="absolute inset-0 bg-rose-100/20 backdrop-blur-sm rounded-2xl shadow-2xl border border-rose-200/40 transform-3d translate-z-[8rem]">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-100/10 via-white/40 to-rose-100/10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
              </div>
              
              <div className="absolute inset-0 bg-rose-100/20 backdrop-blur-sm rounded-2xl shadow-2xl border border-rose-200/40 transform-3d translate-z-[-8rem]">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-100/10 via-white/40 to-rose-100/10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
              </div>
              
              <div className="absolute inset-y-0 left-0 w-32 bg-rose-100/10 backdrop-blur-sm transform-3d origin-left rotate-y-[90deg] translate-x-[-8rem] border-y border-rose-200/40">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              </div>
              
              <div className="absolute inset-y-0 right-0 w-32 bg-rose-100/10 backdrop-blur-sm transform-3d origin-right rotate-y-[-90deg] translate-x-[8rem] border-y border-rose-200/40">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              </div>
              
              {sampleNotes.map((note, index) => {
                const positions = [
                  "top-8 left-8 translate-z-[4rem]",
                  "top-12 right-8 translate-z-[2rem]",
                  "bottom-24 left-12 translate-z-[6rem]",
                  "bottom-16 right-10 translate-z-[3rem]",
                  "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-z-[5rem]",
                ];
                
                return (
                  <div
                    key={index}
                    className={`absolute ${positions[index]} transform-3d animate-float-3d`}
                    style={{ 
                      animationDelay: `${index * 0.5}s`,
                      animationDuration: '3s'
                    }}
                  >
                    <div className="bg-white/90 p-3 rounded-xl shadow-lg backdrop-blur-sm border border-white/50 transform transition-transform hover:scale-110">
                      <div className="flex items-center gap-2">
                        <img 
                          src={moodEmojis[note.mood as keyof typeof moodEmojis].src}
                          alt={moodEmojis[note.mood as keyof typeof moodEmojis].alt}
                          className="w-6 h-6 object-contain"
                        />
                        <span className="text-sm font-medium text-gray-700">{note.text}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="absolute bottom-8 left-0 right-0 text-center transform-3d translate-z-[6rem]">
                <div className="animate-float-up">
                  {samplePrompts.map((prompt, index) => (
                    <p 
                      key={index}
                      className="text-sm text-gray-600 font-medium opacity-0 animate-fade-in drop-shadow-lg"
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
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .transform-3d {
          transform-style: preserve-3d;
        }
        
        .rotate-y-[-20deg] {
          transform: rotateY(-20deg);
        }
        
        .rotate-x-[20deg] {
          transform: rotateX(20deg);
        }
        
        .translate-z-[2rem] {
          transform: translateZ(2rem);
        }
        
        .translate-z-[3rem] {
          transform: translateZ(3rem);
        }
        
        .translate-z-[4rem] {
          transform: translateZ(4rem);
        }
        
        .translate-z-[5rem] {
          transform: translateZ(5rem);
        }
        
        .translate-z-[6rem] {
          transform: translateZ(6rem);
        }
        
        .translate-z-[8rem] {
          transform: translateZ(8rem);
        }
        
        .translate-z-[-8rem] {
          transform: translateZ(-8rem);
        }
        
        @keyframes float-3d {
          0%, 100% {
            transform: translateZ(var(--z)) translateY(0);
          }
          50% {
            transform: translateZ(var(--z)) translateY(-10px);
          }
        }
        
        .animate-float-3d {
          animation: float-3d 3s ease-in-out infinite;
        }
        
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
