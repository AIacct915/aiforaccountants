import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// ✅ Confirm env vars exist
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  console.error('❌ Missing Airtable credentials in environment variables.');
}

const base = new Airtable({ apiKey }).base(baseId!);

export async function GET() {
  try {
    console.log('🔍 Reached /api/tools');

    const records = await base('Tools').select().firstPage();

    console.log(`✅ Airtable returned ${records.length} records`);

    const tools = records.map((record) => ({
      id: record.id,
      Name: record.get('Name') as string,
      Description: record.get('Description') as string | undefined,
      Link: record.get('Link') as string | undefined,
    }));

    return NextResponse.json(tools);
  } catch (error) {
    const message = (error as Error)?.message || String(error);
    console.error('❌ Error in /api/tools:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
