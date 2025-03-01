
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Heart, Send, Star, Smile, User } from "lucide-react";
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
            aria-label="Profile"
          >
            <User className="h-6 w-6" />
          </button>
          <div className="flex justify-center">
            <Star className="h-8 w-8 text-rose-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">GratitudeJar</h1>
          <p className="text-gray-600">Capture life's precious moments ✨</p>
        </div>

        {/* Improved Jar Visualization */}
        <div className="jar-container mt-4">
          <div className="jar">
            <div className="jar-lid"></div>
            <div className="jar-body">
              <div className="jar-label">
                <div className="jar-label-text">
                  Gratitude Jar <Heart className="h-4 w-4 text-rose-500" />
                </div>
              </div>
              
              {sampleNotes.map((note, index) => {
                const positions = [
                  "bottom-6 left-6 delay-1",
                  "bottom-12 right-6 delay-2",
                  "bottom-20 left-10 delay-3",
                  "bottom-24 right-10 delay-4",
                  "bottom-32 left-1/2 -translate-x-1/2 delay-5",
                ];
                
                return (
                  <div
                    key={index}
                    className={`note-item animate-float ${positions[index]}`}
                  >
                    <img 
                      src={moodEmojis[note.mood as keyof typeof moodEmojis].src}
                      alt={moodEmojis[note.mood as keyof typeof moodEmojis].alt}
                      className="w-5 h-5 object-contain"
                    />
                    <span>{note.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="gratitude-card">
          <div className="card-title">
            <Smile className="h-5 w-5 text-rose-500" />
            Today's Gratitude
          </div>
          
          <Button 
            onClick={() => navigate('/create')} 
            className="action-button primary"
          >
            <PlusCircle className="h-5 w-5" />
            Add New Entry
          </Button>
          
          <div className="action-buttons-container">
            <Button
              variant="outline"
              onClick={() => navigate('/jar')}
              className="action-button secondary"
            >
              <Heart className="h-4 w-4 text-rose-500" />
              View Jar
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/chat')}
              className="action-button secondary"
            >
              <Send className="h-4 w-4 text-rose-500" />
              Chat with Jari
            </Button>
          </div>
        </div>

        <div className="footer-text">
          Start your gratitude journey today
        </div>
      </div>
    </div>
  );
};

export default Index;
