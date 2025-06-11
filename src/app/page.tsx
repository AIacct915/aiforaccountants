'use client';

import { useEffect, useState } from 'react';
import { fetchTools, AirtableTool, addSubscriber } from '../lib/airtable';

export default function Home() {
  const [tools, setTools] = useState<AirtableTool[]>([]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadTools() {
      const data = await fetchTools();
      setTools(data);
    }
    loadTools();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addSubscriber(email);
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error('Failed to submit:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">AI Tools for Accountants</h1>
      <p className="text-center text-gray-600 mb-10">
        Discover the best AI tools for accounting, tax, and finance professionals.
      </p>

      {/* Email Signup Section */}
      <section className="mb-12 text-center">
        <h2 className="text-xl font-semibold mb-2">Get Notified When New Tools Are Added</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border rounded w-64"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              {loading ? 'Submitting...' : 'Notify Me'}
            </button>
          </form>
        ) : (
          <p className="text-green-600 mt-4">You're on the list! ✅</p>
        )}
      </section>

      {/* Tool List */}
      <section className="grid gap-6">
        {tools.map((tool) => (
          <div key={tool.id} className="border p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold">{tool.Name}</h2>
            <p className="text-gray-600 mt-1">{tool.Description}</p>
            {tool.Link && (
              <a
                href={tool.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-block mt-2"
              >
                Visit Site →
              </a>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}