import { getNumberData } from '@/app/utils/supabase';

export async function GET(req: Request) {
  try {
    const data = await getNumberData();
    return new Response(JSON.stringify({ data }), {
      status: 200,
    });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
