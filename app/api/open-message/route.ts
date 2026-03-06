import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Generate a random pastel/romantic color
function generateEnvelopeColor(): string {
  const hue = Math.floor(Math.random() * 360)
  const saturation = 60 + Math.floor(Math.random() * 20) // 60-80%
  const lightness = 75 + Math.floor(Math.random() * 15) // 75-90%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, message_id } = body

    if (!user_id || !message_id) {
      return NextResponse.json(
        { error: 'user_id and message_id are required' },
        { status: 400 }
      )
    }

    // Check if message exists
    const { data: messageData, error: messageError } = await supabase
      .from('messages')
      .select('id, content')
      .eq('id', message_id)
      .single()

    if (messageError || !messageData) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      )
    }

    // Check if already opened
    const { data: existingOpened } = await supabase
      .from('opened_messages')
      .select('*')
      .eq('user_id', user_id)
      .eq('message_id', message_id)
      .single()

    if (existingOpened) {
      // Return existing opened message
      return NextResponse.json({
        id: existingOpened.id,
        message_id: messageData.id,
        content: messageData.content,
        envelope_color: existingOpened.envelope_color,
        already_opened: true,
      })
    }

    // Generate random envelope color
    const envelopeColor = generateEnvelopeColor()

    // Insert into opened_messages
    const { data: insertedData, error: insertError } = await supabase
      .from('opened_messages')
      .insert({
        user_id,
        message_id,
        envelope_color: envelopeColor,
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      id: insertedData.id,
      message_id: messageData.id,
      content: messageData.content,
      envelope_color: envelopeColor,
      already_opened: false,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
