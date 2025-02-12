
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lovable.supabase.co';
const supabaseKey = 'eyJh...'; // This will be automatically injected by Lovable

export const supabase = createClient(supabaseUrl, supabaseKey);
