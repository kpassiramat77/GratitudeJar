
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight, Bell, Settings, HelpCircle, LogOut, UserCircle } from "lucide-react";

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
      onClick: () => navigate("/profile/edit"),
    },
    {
      icon: <Bell className="h-6 w-6" />,
      label: "Notifications",
      onClick: () => navigate("/notifications"),
    },
    {
      icon: <Settings className="h-6 w-6" />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      label: "Help & Support",
      onClick: () => navigate("/help"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white">
        <h1 className="p-6 text-2xl font-bold">Profile</h1>
        
        <div className="flex flex-col items-center pb-8">
          <Avatar className="h-24 w-24 bg-purple-500">
            <AvatarFallback className="text-3xl text-white">
              {profile.email?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
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
