import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from '@/shared/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import { Menu } from 'lucide-react';
import { Container } from './Container';

export const Header = () => {
   const [isOpen, setIsOpen] = useState(false);

   const navLinks = [
      { title: 'Главная', path: '/' },
      { title: 'Услуги', path: '/services' },
      { title: 'О центре', path: '/about' },
      { title: 'Экспресс-диагностика', path: '/express-diagnostics' },
   ];

   return (
      <header className="py-4 border-b border-border bg-background sticky top-0 z-50">
         <Container>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Link to="/" className="text-2xl font-bold text-primary">
                     ПсихоЦентр
                  </Link>
               </div>
               
               {/* Десктопное меню */}
               <nav className="hidden md:flex items-center space-x-8">
                  {navLinks.map((link) => (
                     <Link 
                        key={link.path} 
                        to={link.path} 
                        className="text-foreground hover:text-primary transition-colors"
                     >
                        {link.title}
                     </Link>
                  ))}
               </nav>
               
               <div className="flex items-center gap-4">
                  <ThemeSwitcher />
                  
                  {/* Мобильное меню */}
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                     <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                           <Menu className="h-6 w-6" />
                        </Button>
                     </SheetTrigger>
                     <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                        <nav className="flex flex-col gap-4 mt-8">
                           {navLinks.map((link) => (
                              <Link 
                                 key={link.path} 
                                 to={link.path} 
                                 className="text-foreground hover:text-primary transition-colors text-lg py-2"
                                 onClick={() => setIsOpen(false)}
                              >
                                 {link.title}
                              </Link>
                           ))}
                        </nav>
                     </SheetContent>
                  </Sheet>
               </div>
            </div>
         </Container>
      </header>
   );
};