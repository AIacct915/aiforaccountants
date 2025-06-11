import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    await base('Subscribers').create([
      {
        fields: { Email: email },
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Airtable error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
