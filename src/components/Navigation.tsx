
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, PlusCircle, User, MessageCircle } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t">
      <Tabs value={currentPath} className="w-full max-w-md mx-auto">
        <TabsList className="grid w-full grid-cols-4 bg-rose-50/50">
          <TabsTrigger
            value="/"
            onClick={() => navigate("/")}
            className="data-[state=active]:bg-rose-100 hover:bg-rose-50 flex flex-col items-center gap-1 py-2 text-rose-700"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </TabsTrigger>
          <TabsTrigger
            value="/create"
            onClick={() => navigate("/create")}
            className="data-[state=active]:bg-rose-100 hover:bg-rose-50 flex flex-col items-center gap-1 py-2 text-rose-700"
          >
            <PlusCircle className="h-5 w-5" />
            <span className="text-xs">Add</span>
          </TabsTrigger>
          <TabsTrigger
            value="/jar"
            onClick={() => navigate("/jar")}
            className="data-[state=active]:bg-rose-100 hover:bg-rose-50 flex flex-col items-center gap-1 py-2 text-rose-700"
          >
            <div className="relative w-5 h-5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-5 border-2 border-current rounded-lg relative">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-current rounded-t-sm"></div>
                </div>
              </div>
            </div>
            <span className="text-xs">My Jar</span>
          </TabsTrigger>
          <TabsTrigger
            value="/chat"
            onClick={() => navigate("/chat")}
            className="data-[state=active]:bg-rose-100 hover:bg-rose-50 flex flex-col items-center gap-1 py-2 text-rose-700"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">Chat</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Navigation;
