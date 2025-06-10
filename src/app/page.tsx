'use client';
import { useState } from 'react';

type Tool = {
  name: string;
  description: string;
  link: string;
  tags: string[];
};

const tools: Tool[] = [
  {
    name: 'Docyt',
    description: 'Automate bookkeeping with AI. Great for small businesses and accountants.',
    link: 'https://docyt.com',
    tags: ['Bookkeeping', 'Automation', 'Paid'],
  },
  {
    name: 'Blue Dot',
    description: 'AI-powered expense classification and VAT recovery.',
    link: 'https://www.bluedotcorp.com',
    tags: ['Tax', 'Expenses', 'Enterprise'],
  },
  {
    name: 'Digits',
    description: 'AI financial reports for startups and accountants.',
    link: 'https://digits.com',
    tags: ['Reporting', 'Free', 'Startup'],
  },
];

const getAllTags = (tools: Tool[]): string[] => {
  const tagSet = new Set<string>();
  tools.forEach((tool) => tool.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet);
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = getAllTags(tools);

  const filteredTools = tools.filter((tool) => {
    const matchesQuery =
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
    const matchesTag = activeTag ? tool.tags.includes(activeTag) : true;
    return matchesQuery && matchesTag;
  });

  return (
    <main className="min-h-screen bg-white text-gray-900 p-6">
      <header className="mb-10 border-b pb-4">
        <h1 className="text-3xl font-bold">AI for Accountants</h1>
        <p className="text-gray-600 mt-2">Search and explore the best AI tools for accounting pros.</p>
      </header>

      <section className="mb-6">
        <input
          type="text"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border p-2 rounded-md mb-4"
        />

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 rounded-full border ${
              !activeTag ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            All
          </button>
          {allTags.map((tag, i) => (
            <button
              key={i}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded-full border ${
                activeTag === tag ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {filteredTools.length === 0 ? (
          <p className="text-gray-500">No tools match your search.</p>
        ) : (
          <ul className="space-y-4">
            {filteredTools.map((tool, index) => (
              <li key={index} className="border p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold">{tool.name}</h3>
                <p className="text-gray-600">{tool.description}</p>
                <div className="flex gap-2 text-sm mt-2">
                  {tool.tags.map((tag, i) => (
                    <span key={i} className="bg-gray-200 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
                <a
                  className="text-blue-600 underline mt-2 block"
                  href={tool.link}
                  target="_blank"
                >
                  Visit site →
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="mt-20 border-t pt-4 text-sm text-gray-500">
        &copy; 2025 AI for Accountants.
      </footer>
    </main>
  );
}
