import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('user_id')

  if (!userId) {
    return NextResponse.json({ error: 'user_id is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('opened_messages')
    .select('message_id, envelope_color, opened_at')
    .eq('user_id', userId)
    .order('opened_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    opened: data.map((item) => ({
      message_id: item.message_id,
      envelope_color: item.envelope_color,
      opened_at: item.opened_at,
    })),
  })
}
