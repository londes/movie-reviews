import { NextResponse } from 'next/server';
import Writer from 'writer-sdk';

const writer = new Writer({
    apiKey: process.env.WRITER_API_KEY
})

export async function POST(req) {
  console.log('in our post')
  try {
    const { messages } = await req.json()
    console.log('Messages received:', messages)
    console.log('API Key exists:', !!process.env.WRITER_API_KEY)

    const response = await writer.chat.chat({
        model: 'palmyra-x-004',
        messages: messages,
    })
    return Response.json({
        reply: response.choices?.[0]?.message?.content || "No response",
      });
  }catch(error){
    console.error('Full error details:', error)
    console.error('Error message:', error.message)
    console.error('Error response:', error.response?.data)
    return Response.json({ error: "failed to fetch ai response" }, { status: 500 });
  }
}

// optimizations for this functions
// runtime: 'nodejs' necessary to force node runtime environment
export const config = {
  api: {
    bodyParser: true,
    responseLimit: '8mb',
    externalResolver: true,
    runtime: 'nodejs',
  },
};
