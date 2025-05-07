import { Container } from '@/widgets/Container';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button';
import { Link } from 'react-router-dom';
import { ContactModal } from '@/widgets/ContactModal';
import { 
   Tabs, 
   TabsContent, 
   TabsList, 
   TabsTrigger 
} from '@/shared/ui/tabs';
import { 
   Card, 
   CardContent, 
   CardDescription, 
   CardTitle 
} from '@/shared/ui/card';

export const AboutPage = () => {
   const teamMembers = [
      {
         id: 1,
         name: 'Иванова Анна Сергеевна',
         position: 'Руководитель центра',
         description: 'Кандидат психологических наук, специалист по детской психологии с 15-летним опытом работы',
         photo: 'https://randomuser.me/api/portraits/women/22.jpg'
      },
      {
         id: 2,
         name: 'Петров Михаил Александрович',
         position: 'Психолог-консультант',
         description: 'Специалист по семейной психологии, автор методик по работе с подростками',
         photo: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      {
         id: 3,
         name: 'Смирнова Елена Викторовна',
         position: 'Арт-терапевт',
         description: 'Эксперт по использованию творческих методик в психологической работе с детьми',
         photo: 'https://randomuser.me/api/portraits/women/45.jpg'
      },
      {
         id: 4,
         name: 'Козлов Дмитрий Игоревич',
         position: 'Психолог-диагност',
         description: 'Специалист по выявлению способностей и талантов у детей и подростков',
         photo: 'https://randomuser.me/api/portraits/men/67.jpg'
      }
   ];

   return (
      <Container>
         <section className="py-12">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="text-center mb-16"
            >
               <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text ">
                  О нашем центре
               </h1>
               <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
               <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                  Консультационно-диагностический центр "Навигатор развития талантов" при Академии психологии и педагогики ЮФУ
               </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
               >
                  <h2 className="text-3xl font-bold mb-6">Наша миссия</h2>
                  <p className="text-lg mb-6 leading-relaxed">
                     Мы помогаем детям и подросткам раскрыть свой потенциал, определить сильные стороны и развить таланты. 
                     Наш центр создан для того, чтобы каждый ребенок мог найти свой путь к успеху и самореализации.
                  </p>
                  <p className="text-lg mb-6 leading-relaxed">
                     Мы верим, что каждый ребенок уникален и обладает особыми способностями, которые можно и нужно развивать. 
                     Наша задача — помочь детям и их родителям увидеть эти способности и создать условия для их развития.
                  </p>
                  <div className="flex gap-4 mt-8">
                  <ContactModal 
                  buttonText="Записаться на консультацию" 
                  buttonVariant="default" 
                  buttonSize="default"
                  />
               
                     <Link to="/services">
                        <Button variant="outline" size="large" className="px-8 rounded-full">
                           Наши услуги
                        </Button>
                     </Link>
                  </div>
               </motion.div>
               
               <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative"
               >
                  
                  <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                     <img 
                        src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                        alt="Наш центр" 
                        className="w-full h-full object-cover"
                     />
                  </div>
               </motion.div>
            </div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.6 }}
               className="mb-16"
            >
               <h2 className="text-3xl font-bold mb-8 text-center">О нашем центре</h2>
               
               <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                     <TabsTrigger value="about">О центре</TabsTrigger>
                     <TabsTrigger value="approach">Наш подход</TabsTrigger>
                     <TabsTrigger value="values">Ценности</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="about" className="text-lg leading-relaxed">
                     <p className="mb-4">
                        Консультационно-диагностический центр "Навигатор развития талантов" был основан в 2015 году на базе Академии психологии и педагогики Южного Федерального Университета. 
                        За годы работы мы помогли более 5000 детей и подростков раскрыть свой потенциал и найти свое призвание.
                     </p>
                     <p className="mb-4">
                        Наш центр оснащен современным диагностическим оборудованием и использует передовые методики в области детской психологии и педагогики. 
                        Мы постоянно совершенствуем наши программы, чтобы предоставлять нашим клиентам самые эффективные услуги.
                     </p>
                     <p>
                        Мы сотрудничаем с ведущими образовательными учреждениями города и области, а также с психологическими центрами по всей России. 
                        Это позволяет нам обмениваться опытом и внедрять лучшие практики в нашу работу.
                     </p>
                  </TabsContent>
                  
                  <TabsContent value="approach" className="text-lg leading-relaxed">
                     <p className="mb-4">
                        Наш подход основан на комплексной диагностике способностей и личностных особенностей ребенка. 
                        Мы используем как классические, так и инновационные методики, которые позволяют получить полную картину потенциала ребенка.
                     </p>
                     <p className="mb-4">
                        Мы работаем не только с детьми, но и с их родителями, помогая создать в семье атмосферу, способствующую развитию талантов. 
                        Наши специалисты проводят индивидуальные консультации, семинары и тренинги для родителей.
                     </p>
                     <p>
                        Важной частью нашего подхода является долгосрочное сопровождение. 
                        Мы не просто проводим диагностику и даем рекомендации, но и помогаем реализовать эти рекомендации, отслеживаем прогресс и корректируем программу развития при необходимости.
                     </p>
                  </TabsContent>
                  
                  <TabsContent value="values" className="text-lg leading-relaxed">
                     <ul className="list-disc pl-6 space-y-3">
                        <li>
                           <strong>Индивидуальный подход</strong> — мы признаем уникальность каждого ребенка и разрабатываем программы, учитывающие его особенности.
                        </li>
                        <li>
                           <strong>Научная обоснованность</strong> — все наши методики базируются на современных научных исследованиях в области психологии и педагогики.
                        </li>
                        <li>
                           <strong>Комплексность</strong> — мы рассматриваем развитие ребенка во всех аспектах: интеллектуальном, эмоциональном, социальном и физическом.
                        </li>
                        <li>
                           <strong>Партнерство</strong> — мы строим отношения с детьми и родителями на основе взаимного уважения и доверия.
                        </li>
                        <li>
                           <strong>Развитие</strong> — мы постоянно совершенствуем наши методики и повышаем квалификацию наших специалистов.
                        </li>
                     </ul>
                  </TabsContent>
               </Tabs>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.8 }}
               className="mb-16"
            >
               <h2 className="text-3xl font-bold mb-8 text-center">Наша команда</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teamMembers.map((member, index) => (
                     <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 * index }}
                     >
                        <Card className="h-full hover:shadow-lg transition-all duration-300">
                           <CardContent className="pt-6 flex flex-col items-center text-center">
                              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                                 <img 
                                    src={member.photo} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover"
                                 />
                              </div>
                              <CardTitle className="mb-2">{member.name}</CardTitle>
                              <div className="text-primary font-medium mb-3">{member.position}</div>
                              <CardDescription>{member.description}</CardDescription>
                           </CardContent>
                        </Card>
                     </motion.div>
                  ))}
               </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 1 }}
               className="bg-primary/5 rounded-2xl p-8 mb-16"
            >
               <h2 className="text-3xl font-bold mb-6 text-center">Наши достижения</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                  <div className="flex flex-col items-center">
                     <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                     <div className="text-lg">Детей получили помощь</div>
                  </div>
                  <div className="flex flex-col items-center">
                     <div className="text-4xl font-bold text-primary mb-2">15</div>
                     <div className="text-lg">Квалифицированных специалистов</div>
                  </div>
                  <div className="flex flex-col items-center">
                     <div className="text-4xl font-bold text-primary mb-2">8</div>
                     <div className="text-lg">Лет успешной работы</div>
                  </div>
                  <div className="flex flex-col items-center">
                     <div className="text-4xl font-bold text-primary mb-2">20+</div>
                     <div className="text-lg">Уникальных программ</div>
                  </div>
               </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 1.2 }}
               className="text-center"
            >
               <h2 className="text-3xl font-bold mb-6">Свяжитесь с нами</h2>
               <p className="text-lg mb-8 max-w-2xl mx-auto">
                  Если у вас есть вопросы о нашем центре или вы хотите записаться на консультацию, 
                  пожалуйста, свяжитесь с нами любым удобным способом.
               </p>
               <ContactModal 
                  buttonText="Записаться на консультацию" 
                  buttonVariant="default" 
                  buttonSize="default"
                  />
               
            </motion.div>
         </section>
      </Container>
   );
};