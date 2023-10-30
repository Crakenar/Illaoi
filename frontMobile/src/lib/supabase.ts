import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lpjqkyidwzotrglptnas.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwanFreWlkd3pvdHJnbHB0bmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2MTE1MTMsImV4cCI6MjAxNDE4NzUxM30.ueTaI5LeSfO7v7LuYMzNV8xUZ6HVU-CKPRecpMK1neE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})