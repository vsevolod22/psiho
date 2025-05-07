import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/shared/ui/dialog';
import { ContactForm } from '@/widgets/ContactForm';
import { cn } from '@/utils/lib/utils';

interface ContactModalProps {
   className?: string;
   buttonText?: string;
   buttonSize?: 'default' | 'small' | 'large';
   buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
   rounded?: boolean;
}

export function ContactModal({ 
   className, 
   buttonText = 'Записаться на консультацию', 
   buttonSize = 'default',
   buttonVariant = 'default',
   rounded = true
}: ContactModalProps) {
   const [open, setOpen] = useState(false);

   const toggleOpenStatus = (status: boolean) => {
      setOpen(status);
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button 
               className={cn(className, rounded && 'rounded-full')} 
               size={buttonSize} 
               variant={buttonVariant}
            >
               {buttonText}
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-md">
            <DialogHeader className="text-center">
               <h2 className="text-2xl font-bold">Свяжитесь с нами</h2>
               <p className="text-muted-foreground">
                  Оставьте свои контактные данные, и мы свяжемся с вами в ближайшее время
               </p>
            </DialogHeader>
            <ContactForm inModal={true} toggleOpenStatus={toggleOpenStatus} />
         </DialogContent>
      </Dialog>
   );
}