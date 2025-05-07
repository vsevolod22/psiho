import { useParams, Link } from 'react-router-dom';
import { Container } from '@/widgets/Container';
import { Button } from '@/shared/ui/button';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { Card, CardContent, CardDescription, CardTitle } from '@/shared/ui/card';
import { ChevronLeft } from 'lucide-react';
import { servicesData } from '@/shared/data/servicesData';
import { ContactModal } from '@/widgets/ContactModal';

export const ServiceDetailsPage = () => {
   const { id } = useParams<{ id: string }>();
   
   const service = servicesData.find(s => s.id === Number(id));
   
   if (!service) {
      return (
         <Container>
            <div className="py-16 text-center">
               <h1 className="text-3xl font-bold mb-6">Услуга не найдена</h1>
               <Link to="/services">
                  <Button>Вернуться к списку услуг</Button>
               </Link>
            </div>
         </Container>
      );
   }

   return (
      <Container>
         <section className="py-12">
            <Link to="/services" className="inline-flex items-center mb-8 text-primary hover:underline">
               <ChevronLeft className="h-4 w-4 mr-1" />
               Назад к списку услуг
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
               <motion.div 
                  className="lg:col-span-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
               >
                  <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
                  <p className="text-lg mb-6 leading-relaxed">{service.fullDescription}</p>
                  
                  <h2 className="text-2xl font-semibold mb-4">Преимущества:</h2>
                  <ul className="list-disc pl-6 mb-8 space-y-2">
                     {service.benefits.map((benefit, index) => (
                        <li key={index} className="text-lg">{benefit}</li>
                     ))}
                  </ul>
                  
                  <ContactModal 
                  buttonText="Записаться на консультацию" 
                  buttonVariant="default" 
                  buttonSize="large"
                  />
               
               </motion.div>
               
               <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
               >
                  <div className="rounded-lg overflow-hidden shadow-lg">
                     <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-64 object-cover"
                     />
                  </div>
               </motion.div>
            </div>
            
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="mb-16"
            >
               <h2 className="text-3xl font-bold mb-8 text-center">Наши программы</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.subservices.map((subservice) => (
                     <Card key={subservice.id} className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="pt-6">
                           <CardTitle>{subservice.title}</CardTitle>
                           <CardDescription className="mt-2 mb-4">{subservice.description}</CardDescription>
                           <div className="flex justify-between items-center mt-4 text-sm">
                              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                                 {subservice.duration}
                              </span>
                              <span className="font-bold text-lg">{subservice.price}</span>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.6 }}
            >
               <h2 className="text-3xl font-bold mb-8 text-center">Часто задаваемые вопросы</h2>
               <Accordion type="single" collapsible className="max-w-3xl mx-auto">
                  {service.faq.map((item, index) => (
                     <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg font-medium">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-base">{item.answer}</AccordionContent>
                     </AccordionItem>
                  ))}
               </Accordion>
            </motion.div>
         </section>
      </Container>
   );
};