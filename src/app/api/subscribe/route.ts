import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  console.error('❌ Missing Airtable credentials');
}

const base = new Airtable({ apiKey }).base(baseId!);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Create a new record in "Subscribers"
    await base('Subscribers').create([{ fields: { Email: email } }]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Subscription error:', (error as Error).message);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
