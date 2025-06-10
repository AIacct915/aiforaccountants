export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 p-6">
      <header className="mb-10 border-b pb-4">
        <h1 className="text-3xl font-bold">AI for Accountants</h1>
        <p className="text-gray-600 mt-2">Discover the best AI tools for bookkeeping, tax prep, and finance automation.</p>
      </header>

     <section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4">Featured AI Tools</h2>
  <ul className="space-y-4">
    <li className="border p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold">Docyt</h3>
      <p className="text-gray-600">Automate bookkeeping with AI. Great for small businesses and accountants.</p>
      <a className="text-blue-600 underline mt-1 block" href="https://docyt.com" target="_blank">Visit site →</a>
    </li>
    <li className="border p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold">Blue Dot</h3>
      <p className="text-gray-600">AI-powered expense classification and VAT recovery for enterprises.</p>
      <a className="text-blue-600 underline mt-1 block" href="https://www.bluedotcorp.com" target="_blank">Visit site →</a>
    </li>
  </ul>
</section>


      <footer className="mt-20 border-t pt-4 text-sm text-gray-500">
        &copy; 2025 AI for Accountants. Built with 💻 by you.
      </footer>
    </main>
  )
}
