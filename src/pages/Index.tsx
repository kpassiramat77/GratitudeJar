
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Flame, User, Home as HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quotes = [
  { text: "Gratitude turns what we have into enough.", author: "Aesop" },
  { text: "Gratitude is the fairest blossom which springs from the soul.", author: "Henry Ward Beecher" },
  { text: "The root of joy is gratefulness.", author: "David Steindl-Rast" },
];

const sampleNotes = [
  { text: "I am grateful for Friends", color: "bg-orange-100 border-orange-200" },
  { text: "I am grateful for My family", color: "bg-rose-100 border-rose-200" },
  { text: "I am grateful for Good food", color: "bg-yellow-100 border-yellow-200" },
  { text: "I am grateful for My pets", color: "bg-emerald-100 border-emerald-200" },
  { text: "I am grateful for Teachers", color: "bg-purple-100 border-purple-200" },
  { text: "I am grateful for Summer", color: "bg-sky-100 border-sky-200" },
];

const Index = () => {
  const navigate = useNavigate();
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen bg-[#6C3CE6] text-white p-4 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="pt-8 space-y-2">
          <h1 className="text-4xl font-bold">Good evening!</h1>
          <p className="text-lg opacity-90">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => navigate('/create')} 
            className="h-24 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30"
          >
            <div className="flex flex-col items-center gap-2">
              <PlusCircle className="h-8 w-8" />
              <span>Add Gratitude</span>
            </div>
          </Button>
          <Button
            onClick={() => navigate('/jar')}
            className="h-24 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Simple jar icon */}
                  <div className="w-6 h-7 border-2 border-white rounded-lg relative">
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-white rounded-t-sm"></div>
                  </div>
                </div>
              </div>
              <span>View Jar</span>
            </div>
          </Button>
        </div>

        {/* Daily Inspiration */}
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">Daily Inspiration</h2>
            <p className="italic opacity-90">"{randomQuote.text}"</p>
            <p className="text-sm opacity-75">- {randomQuote.author}</p>
          </CardContent>
        </Card>

        {/* Progress Section */}
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Your Progress</h2>
            <div className="flex flex-col items-center gap-2">
              <Flame className="h-8 w-8 text-amber-400" />
              <div className="text-4xl font-bold">0</div>
              <div className="text-sm opacity-75">Day Streak</div>
              <Button 
                variant="default" 
                className="mt-2 bg-[#9747FF] hover:bg-[#8A3FFF] border-none"
              >
                Keep it going!
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-md mx-auto flex justify-around p-4">
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <HomeIcon className="h-6 w-6" />
              <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <PlusCircle className="h-6 w-6" />
              <span className="text-xs">Add</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-5 border-2 border-current rounded-lg relative">
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-current rounded-t-sm"></div>
                  </div>
                </div>
              </div>
              <span className="text-xs">My Jar</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <User className="h-6 w-6" />
              <span className="text-xs">Profile</span>
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Index;
