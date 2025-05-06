import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/widgets/Container';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

export const ServicesPage = () => {
   const [activeCategory, setActiveCategory] = useState('all');
   
   const services = [
      { 
         id: 1, 
         title: 'Диагностика талантов и способностей', 
         description: 'Выявление сильных сторон и потенциала ребенка с помощью современных методик', 
         category: 'diagnostics',
         image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format'
      },
      { 
         id: 2, 
         title: 'Психологическое консультирование', 
         description: 'Индивидуальные и семейные консультации для решения психологических проблем', 
         category: 'consulting',
         image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1470&auto=format'
      },
      { 
         id: 3, 
         title: 'Курсы и тренинги', 
         description: 'Развитие навыков и компетенций через групповые занятия и тренинги', 
         category: 'education',
         image: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1470&auto=format'
      },
      { 
         id: 4, 
         title: 'Программы поддержки', 
         description: 'Сопровождение в сложных ситуациях и помощь в адаптации', 
         category: 'support',
         image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1470&auto=format'
      },
      { 
         id: 5, 
         title: 'Арт-терапия', 
         description: 'Исцеление через творчество и самовыражение', 
         category: 'therapy',
         image: 'https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?q=80&w=1374&auto=format'
      },
      { 
         id: 6, 
         title: 'Родительский клуб', 
         description: 'Поддержка и обмен опытом между родителями под руководством специалистов', 
         category: 'community',
         image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1470&auto=format'
      },
      { 
         id: 7, 
         title: 'Психологические игры', 
         description: 'Развитие через игровые методики и интерактивные занятия', 
         category: 'games',
         image: 'https://images.unsplash.com/photo-1536337005238-94b997371b40?q=80&w=1470&auto=format'
      },
   ];

   const categories = [
      { id: 'all', name: 'Все услуги' },
      { id: 'diagnostics', name: 'Диагностика' },
      { id: 'consulting', name: 'Консультирование' },
      { id: 'education', name: 'Обучение' },
      { id: 'therapy', name: 'Терапия' },
      { id: 'support', name: 'Поддержка' },
      { id: 'community', name: 'Сообщество' },
      { id: 'games', name: 'Игры' },
   ];

   const filteredServices = activeCategory === 'all' 
      ? services 
      : services.filter(service => service.category === activeCategory);

   return (
      <Container>
         <section className="py-16">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="text-center mb-12"
            >
               <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                  Наши услуги
               </h1>
               <p className="text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
                  Мы предлагаем широкий спектр услуг для развития талантов и поддержки психологического благополучия детей и подростков
               </p>
            </motion.div>

            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-12">
               <TabsList className="flex flex-wrap justify-center gap-2 mb-8">
                  {categories.map(category => (
                     <TabsTrigger key={category.id} value={category.id}>
                        {category.name}
                     </TabsTrigger>
                  ))}
               </TabsList>
               
               <TabsContent value={activeCategory} className="mt-0">
                  <motion.div 
                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.4 }}
                  >
                     {filteredServices.map((service) => (
                        <motion.div
                           key={service.id}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.5 }}
                           whileHover={{ y: -5 }}
                        >
                           <Link to={`/services/${service.id}`}>
                              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
                                 <div className="h-48 overflow-hidden">
                                    <img 
                                       src={service.image} 
                                       alt={service.title} 
                                       className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                 </div>
                                 <CardContent className="pt-6">
                                    <CardTitle>{service.title}</CardTitle>
                                    <CardDescription className="mt-2">{service.description}</CardDescription>
                                 </CardContent>
                                 <CardFooter>
                                    <Button variant="link" className="p-0">Подробнее →</Button>
                                 </CardFooter>
                              </Card>
                           </Link>
                        </motion.div>
                     ))}
                  </motion.div>
               </TabsContent>
            </Tabs>
         </section>
      </Container>
   );
};