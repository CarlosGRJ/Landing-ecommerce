'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { SearchBox } from '../ui/SearchBox';

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className='gap-0 space-x-0 text-sm'>
      <NavigationMenuItem>
        <Button variant='ghost' className='text-[15px] font-normal' asChild>
          <Link href='/'>Inicio</Link>
        </Button>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <Button variant='ghost' className='text-[15px] font-normal' asChild>
          <Link href='/categories'>Categorías</Link>
        </Button>
      </NavigationMenuItem>

      <NavigationMenuItem className='hidden md:flex items-center pl-4'>
        <SearchBox />
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { icon: LucideIcon }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}>
          <props.icon className='mb-4 h-6 w-6' />
          <div className='text-sm font-semibold leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
