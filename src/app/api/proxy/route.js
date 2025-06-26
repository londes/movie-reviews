import { NextResponse } from 'next/server';
import Writer from 'writer-sdk';

export async function POST(req) {
  try {
    console.log('creating writer sdk client')

    const client = new Writer({
      apiKey: process.env.WRITER_API_KEY, 
    });
    console.log('in our proxy POST()');
    let body = await req.json();
    console.log('Request body received:', body);
    
    // Validate inputs before sending
    const inputs = [
      { id: 'Movie Name', value: [body.movie] },
      { id: 'Movie Rating', value: [body.rating] },
      { id: 'Plot Summary', value: [body.plot] }
    ];
    
    console.log('Inputs being sent to Writer API:', inputs);
    console.log('Application ID:', '6a7803be-3fbb-470f-a6fa-f2cb93b83eb6');
    
    const response = await client.applications.generateContent(
      '6a7803be-3fbb-470f-a6fa-f2cb93b83eb6',
      {
        inputs: inputs,
      }
    );
    console.log('Writer api response', response.suggestion);
    return NextResponse.json({ suggestion: response.suggestion });
    
  } catch (error) {
    console.error('Full error object:', error);
    console.error('Error message:', error.message);
    console.error('Error response data:', error.response?.data);
    console.error('Error status:', error.response?.status);
    return NextResponse.json({ error: error.message }, { status: 500 });
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
