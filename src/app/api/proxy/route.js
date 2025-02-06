import { NextResponse } from 'next/server';
import Writer from 'writer-sdk';

const client = new Writer({
  apiKey: process.env.WRITER_API_KEY,
});

export async function GET() {
  try {
    console.log('in our proxy GET()');
    const response = await client.applications.generateContent(
      '6a7803be-3fbb-470f-a6fa-f2cb93b83eb6',
      {
        inputs: [
          { id: 'Movie Name', value: ["Austin Powers"] },
          { id: 'Movie Rating', value: ["Great, Excellent"] },
          { id: 'Plot Summary', value: ["A movie about a spy, and his arch nemesis Dr. Evil"] },
        ],
      }
    );
    console.log('Writer api response', response.suggestion);
    return NextResponse.json({ suggestion: response.suggestion });
  } catch (error) {
    console.error('error: ', error);
    return NextResponse.json({ error: 'internal server error' }, { status: 500 });
  }
}