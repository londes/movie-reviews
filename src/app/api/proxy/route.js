export const runtime = 'nodejs'

import { NextResponse } from 'next/server';
import Writer from 'writer-sdk';

export async function POST(req) {
  try {
    console.log('creating writer sdk client')

    const client = new Writer({
      // apiKey: process.env.WRITER_API_KEY,  // commented out API key due to errors, set api key explicitly in header. could it be due to "client" name?
    });
    console.log('in our proxy POST()');
    let body = await req.json();
    const response = await client.applications.generateContent(
      '6a7803be-3fbb-470f-a6fa-f2cb93b83eb6',
      {
        inputs: [
          { id: 'Movie Name', value: [body.movie] },
          { id: 'Movie Rating', value: [body.rating] },
          { id: 'Plot Summary', value: [body.plot] },
          { id: 'Movie Poster, Thumbnail, or Still - Test, WIP', value: []}
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.WRITER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log('full writer response:', response)
    if (!response || typeof response !== 'object' || !response.suggestion) {
      throw new Error('Writer API returned an unexpected response');
    }
    console.log('Writer api response', response.suggestion);
    return NextResponse.json({ suggestion: response.suggestion });
  } catch (error) {
    console.error('error: ', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: true,
    responseLimit: '8mb',
    externalResolver: true,
    runtime: 'nodejs',
  },
};
