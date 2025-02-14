import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight, Bell, Settings, HelpCircle, LogOut, UserCircle } from "lucide-react";
import { MoodAnalytics } from "@/components/analytics/MoodAnalytics";

interface Profile {
  username: string | null;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

interface Stats {
  total_stickers: number;
  favorites: number;
  days_streak: number;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile>({
    username: "",
    full_name: "",
    email: "",
    avatar_url: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    total_stickers: 0,
    favorites: 0,
    days_streak: 0,
  });
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    loadProfile();
    loadStats();
  }, [user, navigate]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, full_name, avatar_url")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile({
          ...data,
          email: user?.email || "",
        });
      }
    } catch (error: any) {
      console.error("Error loading profile:", error);
      toast({
        title: "Error loading profile",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    if (!user) return;
    
    try {
      const { data: gratitudes, error } = await supabase
        .from("gratitudes")
        .select("id, is_favorite, created_at")
        .eq("user_id", user.id);

      if (error) throw error;

      if (gratitudes) {
        const favorites = gratitudes.filter(g => g.is_favorite).length;
        const total = gratitudes.length;
        
        // Calculate streak
        const dates = gratitudes
          .map(g => new Date(g.created_at).toDateString())
          .sort()
          .reverse();
        
        let streak = 0;
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (dates[0] === today || dates[0] === yesterday) {
          streak = 1;
          let lastDate = new Date(dates[0]);
          
          for (let i = 1; i < dates.length; i++) {
            const currentDate = new Date(dates[i]);
            const diffDays = Math.floor((lastDate.getTime() - currentDate.getTime()) / 86400000);
            
            if (diffDays === 1) {
              streak++;
              lastDate = currentDate;
            } else {
              break;
            }
          }
        }

        setStats({
          total_stickers: total,
          favorites,
          days_streak: streak,
        });
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/auth");
    } catch (error) {
      toast({
        title: "Error signing out",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    {
      icon: <UserCircle className="h-6 w-6" />,
      label: "Edit Profile",
      onClick: () => navigate("/"),
    },
    {
      icon: <Bell className="h-6 w-6" />,
      label: "Notifications",
      onClick: () => navigate("/"),
    },
    {
      icon: <Settings className="h-6 w-6" />,
      label: "Settings",
      onClick: () => navigate("/"),
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      label: "Help & Support",
      onClick: () => navigate("/"),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white">
        <div className="flex items-center justify-between p-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-900"
          >
            ←
          </Button>
        </div>
        
        <div className="flex flex-col items-center pb-8">
          <Avatar className="h-24 w-24 bg-rose-500">
            {profile.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt="Profile" />
            ) : (
              <AvatarFallback className="text-3xl text-white">
                {profile.email?.[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            )}
          </Avatar>
          <p className="mt-4 text-gray-600">{profile.email}</p>
        </div>

        <div className="flex justify-around py-8 border-t border-b">
          <div className="text-center">
            <p className="text-3xl font-bold">{stats.total_stickers}</p>
            <p className="text-sm text-gray-500">Total Stickers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{stats.favorites}</p>
            <p className="text-sm text-gray-500">Favorites</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{stats.days_streak}</p>
            <p className="text-sm text-gray-500">Days Streak</p>
          </div>
        </div>

        <div className="px-4 py-6">
          <h2 className="text-xl font-semibold mb-4">Your Gratitude Journey</h2>
          {user && <MoodAnalytics userId={user.id} />}
        </div>

        <div className="px-4 py-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-lg"
            >
              <div className="flex items-center gap-3 text-gray-700">
                {item.icon}
                <span className="text-base">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          ))}
          
          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="w-full flex items-center justify-start gap-3 p-4 text-red-500 hover:text-red-600 hover:bg-red-50 mt-4"
          >
            <LogOut className="h-6 w-6" />
            <span className="text-base">Sign Out</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
