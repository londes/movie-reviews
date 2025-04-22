import { NextResponse } from 'next/server'
import Writer from 'writer-sdk';
import fs from 'fs'
import formidable from 'formidable'

const client = new Writer({})

  export async function GET(req) {
    try {
        console.log('in our POST')
      } catch (error) {
        console.error('server error: ', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  export async function POST(req) {
    try{
        console.log('in our GET')
        const form = formidable({ multiples: false})
        console.log(req)
        let { api_key, file } = req.body
        console.log(api_key, file)
        client.apiKey = api_key
        const uploaded_file = await client.files.upload({
        })
        return NextResponse.json({data: api_key})
    }
    catch (error) {
        return NextResponse.json({error: error.message}, { status: 500 })
    }
}

// must disable bodyParser because we're passing a FormData object
// runtime: 'nodejs' necessary to force node runtime environment
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
    runtime: 'nodejs',
  },
};
