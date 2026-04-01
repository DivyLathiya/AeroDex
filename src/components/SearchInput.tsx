'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/aircraft?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto mt-8">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any aircraft (e.g., A350, 737 MAX)..."
          className="w-full h-14 pl-12 pr-4 text-lg bg-background/90 text-foreground border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-md shadow-2xl transition-all"
        />
        <button 
          type="submit" 
          className="absolute right-2 h-10 px-6 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
