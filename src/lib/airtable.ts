import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);

export interface AirtableTool {
  id: string;
  Name: string;
  Description?: string;
  Link?: string;
}

export async function fetchTools(): Promise<AirtableTool[]> {
  const records = await base('Tools')
    .select({
      view: 'Grid view',
    })
    .all();

  return records.map((record) => ({
    id: record.id,
    Name: record.get('Name') as string,
    Description: record.get('Description') as string | undefined,
    Link: record.get('Link') as string | undefined,
  }));
}

export async function addSubscriber(email: string): Promise<void> {
  await base('Subscribers').create([
    {
      fields: {
        Email: email,
      },
    },
  ]);
}
