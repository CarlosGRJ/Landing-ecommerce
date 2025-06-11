'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const SearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center gap-2 w-full max-w-md'>
      <Input
        type='text'
        placeholder='Buscar productos...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label='Buscar productos'
      />
      <button
        type='submit'
        className='p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'>
        <Search className='w-5 h-5' />
      </button>
    </form>
  );
};
