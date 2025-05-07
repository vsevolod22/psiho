import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Checkbox } from '@/shared/ui/checkbox';

const formSchema = z.object({
   name: z.string().min(2, { message: 'Имя должно содержать не менее 2 символов' }),
   email: z.string().email({ message: 'Введите корректный email' }),
   phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
   message: z.string().optional(),
   agreement: z.boolean().refine(val => val === true, {
      message: 'Необходимо согласие на обработку персональных данных'
   })
});

interface ContactFormProps {
   inModal?: boolean;
   toggleOpenStatus?: (status: boolean) => void;
}

export const ContactForm = ({ inModal = false, toggleOpenStatus }: ContactFormProps) => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: '',
         email: '',
         phone: '',
         message: '',
         agreement: false
      }
   });

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setIsSubmitting(true);
      
      // Имитация отправки данных на сервер
      try {
         // Здесь будет запрос к API
         console.log('Отправка формы:', values);
         
         // Имитация задержки ответа сервера
         await new Promise(resolve => setTimeout(resolve, 1000));
         
         setIsSuccess(true);
         form.reset();
         
         // Если форма в модальном окне, закрываем его через 2 секунды
         if (inModal && toggleOpenStatus) {
            setTimeout(() => {
               toggleOpenStatus(false);
               setIsSuccess(false);
            }, 2000);
         }
      } catch (error) {
         console.error('Ошибка при отправке формы:', error);
      } finally {
         setIsSubmitting(false);
      }
   };

   if (isSuccess) {
      return (
         <div className="text-center py-8">
            <h3 className="text-xl font-bold text-primary mb-2">Спасибо за обращение!</h3>
            <p>Мы свяжемся с вами в ближайшее время.</p>
         </div>
      );
   }

   return (
      <>
         {!inModal && (
            <section className="py-16">
               <div className="max-w-2xl mx-auto text-center mb-10">
                  <h2 className="text-3xl font-bold mb-4">Свяжитесь с нами</h2>
                  <p className="text-lg">
                     Если у вас есть вопросы или вы хотите записаться на консультацию, 
                     заполните форму ниже, и мы свяжемся с вами в ближайшее время.
                  </p>
               </div>
            </section>
         )}
         
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Имя</FormLabel>
                        <FormControl>
                           <Input placeholder="Введите ваше имя" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                           <Input placeholder="Введите ваш email" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               
               <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Телефон</FormLabel>
                        <FormControl>
                           <Input placeholder="Введите ваш телефон" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               
               <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Сообщение (необязательно)</FormLabel>
                        <FormControl>
                           <Textarea 
                              placeholder="Опишите ваш вопрос или запрос" 
                              className="min-h-[100px]" 
                              {...field} 
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               
               <FormField
                  control={form.control}
                  name="agreement"
                  render={({ field }) => (
                     <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                           <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                              className='w-4 h-4'
                           />
                        </FormControl>
                        <div className="space-y-1 leading-none ">
                           <FormLabel className='cursor-pointer'>
                              Я согласен на обработку персональных данных
                           </FormLabel>
                           <FormMessage />
                        </div>
                     </FormItem>
                  )}
               />
               
               <Button 
                  type="submit" 
                  className={inModal ? "w-full" : "px-8"} 
                  disabled={isSubmitting}
               >
                  {isSubmitting ? "Отправка..." : "Отправить"}
               </Button>
            </form>
         </Form>
      </>
   );
};
