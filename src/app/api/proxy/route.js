import { NextResponse } from 'next/server';
import Writer from 'writer-sdk';

const client = new Writer({
  apiKey: process.env.WRITER_API_KEY,
});

export async function POST(req) {
  try {
    console.log('in our proxy POST()');
    let body = await req.json();
    console.log(body)
    const response = await client.applications.generateContent(
      '6a7803be-3fbb-470f-a6fa-f2cb93b83eb6',
      {
        inputs: [
          { id: 'Movie Name', value: [body.movie] },
          { id: 'Movie Rating', value: [body.rating] },
          { id: 'Plot Summary', value: [body.plot] },
        ],
      }
    );
    console.log('full writer response:', response)
    console.log('Writer api response', response.suggestion);
    return NextResponse.json({ suggestion: response.suggestion });
  } catch (error) {
    console.error('error: ', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}