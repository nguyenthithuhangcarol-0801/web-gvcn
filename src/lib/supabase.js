import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wftjdalobjrwlaaphorz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmdGpkYWxvYmpyd2xhYXBob3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzMDY0OTYsImV4cCI6MjEwMzg4MjQ5Nn0.eqe3m1o8GvW0cqe8T0HaWg7KbUlgWr-lx8d0yjyGB_w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Kiểm tra kết nối Supabase
 */
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('students').select('count', { count: 'exact', head: true });
    if (error && error.code !== 'PGRST116') {
      console.warn('Supabase table `students` is not created yet or requires RLS setup:', error.message);
      return { connected: true, tablesReady: false, message: error.message };
    }
    return { connected: true, tablesReady: true };
  } catch (err) {
    console.error('Supabase connection failed:', err);
    return { connected: false, tablesReady: false, error: err.message };
  }
};
