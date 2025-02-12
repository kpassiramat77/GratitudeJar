
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t">
      <Tabs value={currentPath} className="w-full max-w-md mx-auto">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="/"
            onClick={() => navigate("/")}
            className="data-[state=active]:bg-rose-100"
          >
            Home
          </TabsTrigger>
          <TabsTrigger
            value="/create"
            onClick={() => navigate("/create")}
            className="data-[state=active]:bg-rose-100"
          >
            Add
          </TabsTrigger>
          <TabsTrigger
            value="/jar"
            onClick={() => navigate("/jar")}
            className="data-[state=active]:bg-rose-100"
          >
            Jar
          </TabsTrigger>
          <TabsTrigger
            value="/chat"
            onClick={() => navigate("/chat")}
            className="data-[state=active]:bg-rose-100"
          >
            Chat
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Navigation;
