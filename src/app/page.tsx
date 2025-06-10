'use client';
import { useEffect, useState } from 'react';
import { fetchTools, AirtableTool } from '../lib/airtable';

export default function Home() {
  const [tools, setTools] = useState<AirtableTool[]>([]);
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    fetchTools().then(setTools).catch(console.error);
  }, []);

  const allTags = Array.from(
    new Set(tools.flatMap((tool) => tool.fields.Tags || []))
  );

  const filtered = tools.filter((tool) => {
    const matchesQuery =
      tool.fields.Name.toLowerCase().includes(query.toLowerCase()) ||
      tool.fields.Description.toLowerCase().includes(query.toLowerCase());
    const matchesTag = activeTag ? (tool.fields.Tags || []).includes(activeTag) : true;
    return matchesQuery && matchesTag;
  });

  return (
    <main className="min-h-screen bg-white text-gray-800 px-4 sm:px-8 py-10 max-w-4xl mx-auto font-sans">
      <header className="mb-10 border-b pb-6">
        <h1 className="text-4xl font-bold mb-2">AI for Accountants</h1>
        <p className="text-gray-500 text-lg">Powered by Airtable CMS</p>
      </header>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tools..."
        className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 rounded-full border text-sm ${
            !activeTag ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1 rounded-full border text-sm ${
              activeTag === tag ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <ul className="space-y-6">
        {filtered.map((tool) => (
          <li
            key={tool.id}
            className="border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition bg-white"
          >
            <h3 className="text-xl font-semibold">{tool.fields.Name}</h3>
            <p className="text-gray-600 mt-1">{tool.fields.Description}</p>
            <div className="flex flex-wrap gap-2 text-sm mt-3">
              {(tool.fields.Tags || []).map((tag, i) => (
                <span key={i} className="bg-gray-200 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={tool.fields.Link}
              target="_blank"
              className="text-blue-600 underline mt-3 inline-block"
            >
              Visit site →
            </a>
          </li>
        ))}
      </ul>

      <footer className="mt-20 text-sm text-gray-400 border-t pt-6 text-center">
        &copy; {new Date().getFullYear()} AI for Accountants
      </footer>
    </main>
  );
}
