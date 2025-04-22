import { NextResponse } from 'next/server';
import Writer from 'writer-sdk';

const client = new Writer({
    apiKey: process.env.WRITER_API_KEY, 
});

export async function POST(req) {
  try {
    console.log('in our kg POST')
    await console.log(req.body)
  } catch (error) {
    console.error('server error: ', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// optimizations for this function
// runtime: 'nodejs' necessary to force node runtime environment
export const config = {
  api: {
    bodyParser: true,
    responseLimit: '8mb',
    externalResolver: true,
    runtime: 'nodejs',
  },
};
