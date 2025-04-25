import { NextResponse } from 'next/server'
import Writer from 'writer-sdk';
import fs from 'fs'
import formidable from 'formidable'
import { Readable } from 'stream'

const client = new Writer()

// must disable bodyParser because we're passing a FormData object
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(req) {
    try {
        console.log('in our GET')
        } catch (error) {
        console.error('server error: ', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try{
        console.log('in our POST')
        const { fields, files } = await parseFormData(req)
        console.log('Fields:', fields)
        console.log('Files:', files)

        let apiKey = fields.apiKey
        let nameOfFile = files.file.originalFilename
        let filePath = files.file[0].filepath
        let contentType = files.file[0].mimetype

        if (!apiKey || !filePath) {
            return NextResponse.json({ error: 'Missing file or API key' }, { status: 400 });
        }
        // set api key
        client.apiKey = apiKey
        // read file
        const fileStream = fs.createReadStream(filePath)
        // Writer SDK upload (gets its own try/catch for Writer client request)
        try {
            let uploadedFile = await client.files.upload({
                content: fileStream,
                'Content-Disposition': `attachment; filename=${nameOfFile}`,
                'Content-Type': contentType,
            })
            console.log('Upload success:', uploadedFile)
            // clean up temp files
            fs.unlink(filePath, (err) => {
                if (err) console.error('Failed to delete temp file:', err);
                else console.log('Temp file deleted');
            });
            return NextResponse.json({ success: true, uploadedFile });
        } catch(sdkError) {
            console.error('Writer SDK error:', sdkError);
            console.error('Full SDK error object:', JSON.stringify(sdkError, null, 2));
            return NextResponse.json({ error: 'Upload to Writer failed', details: sdkError.message }, { status: 500 });
        }
    }
    catch (error) {
        console.log('error: ', error)
        return NextResponse.json({error: error.message}, { status: 500 })
    }
}

// helper function to convert web request into a node stream
async function parseFormData(request) {
    const form = formidable({ keepExtensions: true });
  
    // must convert WebStream into Node.js ReadableStream
    const nodeReq = Readable.fromWeb(request.body)
    nodeReq.headers = Object.fromEntries(request.headers.entries())
  
    return new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
  }