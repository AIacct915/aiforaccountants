// src/lib/airtable.ts
const AIRTABLE_API_TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN!;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!;
const TABLE_NAME = "AI Tools"; // or "Table 1" if you didn’t rename it

export type AirtableTool = {
  id: string;
  fields: {
    Name: string;
    Description: string;
    Link: string;
    Tags: string[];
  };
};

export async function fetchTools(): Promise<AirtableTool[]> {
  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE_NAME)}?view=Grid%20view`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
      },
      next: { revalidate: 60 }, // cache for 60 seconds
    }
  );

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Failed to fetch tools from Airtable");
  }

  const data = await res.json();
  return data.records;
}
