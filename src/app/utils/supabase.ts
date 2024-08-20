import { createClient } from '@supabase/supabase-js';
import { capitalize, randInts, randItem } from './utils';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
export const numberMaxId = process.env.NEXT_PUBLIC_NUMBER_MAX_ID as string;

export const supabaseClient = createClient(supabaseUrl, supabaseKey);

export const getNumberData = async () => {
  const numbersToGet = randInts(numberMaxId ? parseInt(numberMaxId) : 5, 5);
  const response = await supabaseClient
    .from('numbers')
    .select()
    .in('id', numbersToGet);
  const result = response.data;
  const resultNumbers = result?.map((n) => {
    return {
      description: capitalize(randItem(n.description)),
      value: n.value as string,
    };
  });
  return resultNumbers;
};
