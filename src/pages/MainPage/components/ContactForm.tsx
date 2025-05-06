import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';

const feedbackSchema = z.object({
   name: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа' }),
   email: z.string().email({ message: 'Введите корректный email' }),
   phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
   message: z.string().min(10, { message: 'Сообщение должно содержать минимум 10 символов' }),
});

export const ContactForm = () => {
   const form = useForm<z.infer<typeof feedbackSchema>>({
      resolver: zodResolver(feedbackSchema),
      defaultValues: {
         name: '',
         email: '',
         phone: '',
         message: '',
      },
   });

   const onSubmit = (values: z.infer<typeof feedbackSchema>) => {
      console.log(values);
      // Здесь будет логика отправки формы
      form.reset();
   };

   return (
      <section className="py-16">
         <h2 className="text-3xl font-bold mb-8 text-center">Связаться с нами</h2>
         <div className="max-w-2xl mx-auto bg-background-secondary p-8 rounded-xl shadow-sm">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Имя</FormLabel>
                           <FormControl>
                              <Input placeholder="Введите ваше имя" {...field} className="rounded-lg" />
                           </FormControl>
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
                              <Input placeholder="Введите ваш email" {...field} className="rounded-lg" />
                           </FormControl>
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
                              <Input placeholder="Введите ваш телефон" {...field} className="rounded-lg" />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="message"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Сообщение</FormLabel>
                           <FormControl>
                              <Textarea placeholder="Введите ваше сообщение" {...field} className="rounded-lg" />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  <Button type="submit" className="w-full rounded-lg">Отправить</Button>
               </form>
            </Form>
         </div>
      </section>
   );
};