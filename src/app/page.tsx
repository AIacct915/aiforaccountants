'use client';
import { useEffect, useState } from 'react';

type Tool = {
  id: string;
  Name: string;
  Description?: string;
  Link?: string;
  Tags?: string[];
};

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch('/api/tools');
        const data = await res.json();
        setTools(data);
      } catch (error) {
        console.error('Failed to load tools:', error);
      }
    };

    fetchTools();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">AI Tools for Accountants</h1>
      <p className="mb-6 text-gray-600">
        Discover the best AI tools for accounting, tax, and finance professionals.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-2">Get Notified When New Tools Are Added</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-10">
        <input
          type="email"
          placeholder="Your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-4 py-2 flex-grow"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Notify Me
        </button>
      </form>
      {submitted && <p className="text-green-600 mb-4">You're subscribed! ✅</p>}

      <div className="space-y-6">
        {tools.map((tool) => (
          <div key={tool.id} className="border p-4 rounded shadow-sm">
            <h3 className="font-semibold text-lg">{tool.Name}</h3>
            <p className="text-gray-600 mb-2">{tool.Description}</p>
            {tool.Tags?.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 text-sm px-2 py-1 rounded mr-2"
              >
                {tag}
              </span>
            ))}
            <div>
              {tool.Link && (
                <a href={tool.Link} className="text-blue-500 mt-2 inline-block" target="_blank">
                  Visit site →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
