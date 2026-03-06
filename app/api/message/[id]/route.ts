import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('user_id')
  const messageId = parseInt(id, 10)

  if (!userId) {
    return NextResponse.json({ error: 'user_id is required' }, { status: 400 })
  }

  if (isNaN(messageId)) {
    return NextResponse.json({ error: 'Invalid message id' }, { status: 400 })
  }

  // Get the opened message with content
  const { data: openedData, error: openedError } = await supabase
    .from('opened_messages')
    .select('id, envelope_color, opened_at')
    .eq('user_id', userId)
    .eq('message_id', messageId)
    .single()

  if (openedError || !openedData) {
    return NextResponse.json(
      { error: 'Message not found or not opened' },
      { status: 404 }
    )
  }

  // Get message content
  const { data: messageData, error: messageError } = await supabase
    .from('messages')
    .select('content')
    .eq('id', messageId)
    .single()

  if (messageError || !messageData) {
    return NextResponse.json(
      { error: 'Message content not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    id: openedData.id,
    message_id: messageId,
    content: messageData.content,
    envelope_color: openedData.envelope_color,
    opened_at: openedData.opened_at,
  })
}
