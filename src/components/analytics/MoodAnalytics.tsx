
import { useState, useEffect } from 'react';
import { Line } from 'recharts';
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Flame, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MoodAnalytics {
  date: string;
  average_mood_intensity: number;
  total_entries: number;
}

interface Profile {
  current_streak: number;
  longest_streak: number;
  last_gratitude_date: string;
}

export const MoodAnalytics = ({ userId }: { userId: string }) => {
  const [analytics, setAnalytics] = useState<MoodAnalytics[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch mood analytics
        const { data: analyticsData, error: analyticsError } = await supabase
          .from('mood_analytics')
          .select('*')
          .eq('user_id', userId)
          .order('date', { ascending: true })
          .limit(30);

        if (analyticsError) throw analyticsError;

        // Fetch profile data for streaks
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('current_streak, longest_streak, last_gratitude_date')
          .eq('id', userId)
          .single();

        if (profileError) throw profileError;

        setAnalytics(analyticsData || []);
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [userId]);

  if (isLoading) {
    return <Skeleton className="w-full h-48" />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <Flame className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">Current Streak</p>
          <p className="text-2xl font-bold">{profile?.current_streak || 0}</p>
        </Card>
        
        <Card className="p-4 text-center">
          <Trophy className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">Longest Streak</p>
          <p className="text-2xl font-bold">{profile?.longest_streak || 0}</p>
        </Card>
        
        <Card className="p-4 text-center">
          <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">Last Entry</p>
          <p className="text-2xl font-bold">
            {profile?.last_gratitude_date 
              ? new Date(profile.last_gratitude_date).toLocaleDateString()
              : 'No entries'}
          </p>
        </Card>
      </div>

      {analytics.length > 0 && (
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Mood Trend</h3>
          <div className="w-full h-[200px]">
            <Line
              data={analytics}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line 
                type="monotone" 
                dataKey="average_mood_intensity" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
              />
            </Line>
          </div>
        </Card>
      )}
    </div>
  );
};
