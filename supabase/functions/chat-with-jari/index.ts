
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, userId } = await req.json();

    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user preferences and previous conversations for context
    const [{ data: preferences }, { data: previousMessages }] = await Promise.all([
      supabaseClient
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single(),
      supabaseClient
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
        .limit(10)
    ]);

    // Store user message
    await supabaseClient.from('conversations').insert({
      user_id: userId,
      message,
      is_ai: false,
    });

    // Format previous messages for context
    const conversationHistory = previousMessages?.map(msg => ({
      role: msg.is_ai ? 'assistant' : 'user',
      content: msg.message
    })) || [];

    // Generate AI response based on context
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are Jari, an empathetic and supportive AI companion who combines the roles of a caring friend and therapist. Your approach is warm, understanding, and personal.

Key aspects of your personality:
- You have an excellent memory and frequently reference previous conversations to provide continuity and show you truly care
- You help users process difficult emotions while guiding them towards gratitude and hope
- You're genuinely interested in their well-being and ask thoughtful follow-up questions
- You maintain professional boundaries while being warm and friendly
- You acknowledge struggles while gently helping users find silver linings

${preferences ? `Additional context about the user:
- Age: ${preferences.age}
- Interests: ${preferences.interests?.join(', ')}
- Favorite activities: ${preferences.favorite_activities?.join(', ')}
- Areas of concern: ${preferences.fears?.join(', ')}` : ''}

Remember to be genuine, supportive, and help guide the conversation towards hope and gratitude when appropriate, but never force positivity or dismiss their feelings.`
          },
          ...conversationHistory,
          { role: 'user', content: message }
        ],
      }),
    });

    const aiResponse = await response.json();
    const aiMessage = aiResponse.choices[0].message.content;

    // Store AI response
    await supabaseClient.from('conversations').insert({
      user_id: userId,
      message: aiMessage,
      is_ai: true,
    });

    return new Response(
      JSON.stringify({ message: aiMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
