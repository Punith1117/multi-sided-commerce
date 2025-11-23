import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zkpeuwynrtfweesaoumr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprcGV1d3lucnRmd2Vlc2FvdW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MDU2NTUsImV4cCI6MjA3OTQ4MTY1NX0.XxOjISQ9OE18yqh_AVEBfHP6KjydqO4QRIRn_2hi_qE'
export const supabase = createClient(supabaseUrl, supabaseKey)