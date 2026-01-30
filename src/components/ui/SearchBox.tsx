'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from './button';

const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .refine(
      (value) => value.length === 0 || value.length >= 2,
      'Escribe al menos 2 caracteres para buscar.',
    ),
});

type SearchFormData = z.infer<typeof searchSchema>;

export const SearchBox = () => {
  const router = useRouter();

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: '',
    },
  });

  const onSubmit = (data: SearchFormData) => {
    const cleanQuery = data.query.trim();
    if (!cleanQuery) return;
    router.push(`/search?q=${encodeURIComponent(cleanQuery)}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex items-center gap-2 w-full max-w-md'
        role='search'
        aria-label='Buscar productos'>
        <FormField
          control={form.control}
          name='query'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel className='sr-only'>Buscar productos</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Buscar productos...'
                  autoComplete='off'
                  aria-label='Buscar productos'
                  {...field}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    field.onChange(event);
                    if (!nextValue.trim()) {
                      form.clearErrors('query');
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'
          aria-label='Buscar'>
          <Search className='w-5 h-5' />
        </Button>
      </form>
    </Form>
  );
};
