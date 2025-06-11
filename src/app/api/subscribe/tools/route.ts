import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);

export async function GET() {
  try {
    const records = await base('Tools').select({ view: 'Grid view' }).all();

    const tools = records.map((record) => ({
      id: record.id,
      Name: record.get('Name') as string,
      Description: record.get('Description') as string | undefined,
      Link: record.get('Link') as string | undefined,
    }));

    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
  }
}
