import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

export const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  return (
    <nav className='text-sm text-gray-600 mb-6' aria-label='Breadcrumb'>
      <ol className='flex items-center space-x-2'>
        {crumbs.map((crumb, index) => (
          <li key={index} className='flex items-center'>
            {crumb.href ? (
              <Link href={crumb.href} className='hover:text-indigo-600'>
                {crumb.label}
              </Link>
            ) : (
              <span className='text-gray-500'>{crumb.label}</span>
            )}

            {index < crumbs.length - 1 && (
              <ChevronRight className='w-4 h-4 mx-2 text-gray-400' />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
