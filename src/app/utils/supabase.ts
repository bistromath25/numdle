import { createClient } from '@supabase/supabase-js';
import { capitalize, randInts, randItem } from './utils';
import { numberMaxId, supabaseKey, supabaseUrl } from './env';

export const supabaseClient = createClient(supabaseUrl, supabaseKey);

export const getNumberData = async () => {
  const numbersToGet = randInts(numberMaxId ? parseInt(numberMaxId) : 5, 5);
  const { data, error } = await supabaseClient
    .from('numbers')
    .select()
    .in('id', numbersToGet);
  const resultNumbers = data?.map((n) => {
    return {
      description: capitalize(randItem(n.description)),
      value: n.value as string,
    };
  });
  if (resultNumbers) {
    return resultNumbers;
  }
  if (error) {
    throw error;
  }
  return null;
};
