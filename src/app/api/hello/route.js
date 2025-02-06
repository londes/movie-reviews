import { NextResponse } from 'next/server'

export async function GET() {
    console.log('sanity check in our hello GET')
    return NextResponse.json({message: "Hello"})
}