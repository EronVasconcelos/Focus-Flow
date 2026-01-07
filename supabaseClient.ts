
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fptohbjupkicwnofejsk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_4otRs6bqlzT2Ax12ll3msA_KnYzTILv';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
