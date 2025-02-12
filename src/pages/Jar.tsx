
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Jar = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-teal-50 p-4 pb-24">
      <div className="max-w-md mx-auto">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Your Gratitude Jar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Start adding gratitude moments to fill your jar!</p>
              <Button 
                onClick={() => navigate('/create')}
                className="bg-rose-500 hover:bg-rose-600"
              >
                Add First Entry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Jar;
