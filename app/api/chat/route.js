import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an AI assistant knowledgeable about the Sidemen.' },
        { role: 'user', content: message },
      ],
      max_tokens: 100,
      temperature: 0.7, // Add temperature for more controlled outputs
    });

    const generatedText = response.choices[0].message.content.trim();

    return NextResponse.json({ response: generatedText });
  } catch (error) {
    console.error('Error in API Route:', error);
    
    if (error.response) {
      // OpenAI API error
      return NextResponse.json(
        { error: error.response.data.error.message || 'OpenAI API error' },
        { status: error.response.status }
      );
    } else {
      // Other errors
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
  }
}