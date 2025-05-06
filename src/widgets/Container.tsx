
import { cn } from '@/utils/lib/utils';
import { ReactNode } from 'react';

interface ContainerProps {
   children: ReactNode;
   className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
   return (
      <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', className)}>
         {children}
      </div>
   );
};