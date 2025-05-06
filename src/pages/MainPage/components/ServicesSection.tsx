import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ServicesSection = () => {
   const [isPaused, setIsPaused] = useState(false);
   const [position, setPosition] = useState(0);
   const [isManualScrolling, setIsManualScrolling] = useState(false);
   const containerRef = useRef<HTMLDivElement>(null);
   
   const services = [
      { id: 1, title: 'Диагностика талантов и способностей', description: 'Выявление сильных сторон и потенциала' },
      { id: 2, title: 'Психологическое консультирование', description: 'Индивидуальные и семейные консультации' },
      { id: 3, title: 'Курсы и тренинги', description: 'Развитие навыков и компетенций' },
      { id: 4, title: 'Программы поддержки', description: 'Сопровождение в сложных ситуациях' },
      { id: 5, title: 'Арт-терапия', description: 'Исцеление через творчество' },
      { id: 6, title: 'Родительский клуб', description: 'Поддержка и обмен опытом' },
      { id: 7, title: 'Психологические игры', description: 'Развитие через игровые методики' },
   ];

   // Создаем расширенный массив для карусели (только один дополнительный набор)
   const extendedServices = [...services, ...services];
   
   // Ширина карточки + отступ
   const cardWidth = 324; // 300px + 24px gap
   
   // Общая ширина всех карточек в одном наборе
   const totalWidth = cardWidth * services.length;
   
   // Автоматическая прокрутка
   useEffect(() => {
      let animationId: number;
      let lastTime = 0;
      const speed = 0.125; // пикселей в миллисекунду (замедлено)
      
      const animate = (time: number) => {
         if (lastTime !== 0 && !isPaused && !isManualScrolling) {
            const delta = time - lastTime;
            setPosition((prevPosition) => {
               // Вычисляем новую позицию
               let newPosition = prevPosition - speed * delta;
               
               // Если достигли конца первого набора, анимированно перемещаемся в начало
               if (newPosition <= -totalWidth) {
                  // Запускаем анимированный переход в начало с текущей позиции
                  setTimeout(() => {
                     animateToStart(newPosition);
                  }, 0);
                  return prevPosition; // Возвращаем текущую позицию, чтобы не было двойного обновления
               }
               
               return newPosition;
            });
         }
         
         lastTime = time;
         animationId = requestAnimationFrame(animate);
      };
      
      animationId = requestAnimationFrame(animate);
      
      return () => {
         cancelAnimationFrame(animationId);
      };
   }, [isPaused, isManualScrolling]);
   
   // Функция для анимированного перехода в начало
   const animateToStart = (startPos: number = position) => {
      setIsManualScrolling(true);
      
      const startTime = performance.now();
      const duration = 1800; // Увеличиваем длительность для более плавной анимации
      const startPosition = startPos;
      const targetPosition = 0;
      
      // Используем более плавную функцию анимации
      const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
      
      const animateReset = (time: number) => {
         const elapsed = time - startTime;
         const progress = Math.min(elapsed / duration, 1);
         
         // Используем более плавную функцию easeOutQuint
         const easeProgress = easeOutQuint(progress);
         
         const currentPosition = startPosition + ((targetPosition - startPosition) * easeProgress);
         setPosition(currentPosition);
         
         if (progress < 1) {
            requestAnimationFrame(animateReset);
         } else {
            setPosition(0); // Устанавливаем точно в 0
            setTimeout(() => {
               setIsManualScrolling(false);
            }, 100);
         }
      };
      
      requestAnimationFrame(animateReset);
   };
   
   // Удаляем неиспользуемую функцию cubicBezier, заменяем на более простую и эффективную
   const cubicBezier = (p0: number, p1: number, p2: number, p3: number, t: number) => {
      const oneMinusT = 1 - t;
      const oneMinusTSquared = oneMinusT * oneMinusT;
      const oneMinusTCubed = oneMinusTSquared * oneMinusT;
      const tSquared = t * t;
      const tCubed = tSquared * t;
      
      return oneMinusTCubed * p0 + 3 * oneMinusTSquared * t * p1 + 3 * oneMinusT * tSquared * p2 + tCubed * p3;
   };
   
   // Функция для ручной прокрутки
   const scroll = (direction: 'left' | 'right') => {
      setIsManualScrolling(true);
      
      const scrollAmount = direction === 'left' ? cardWidth : -cardWidth;
      
      // Анимируем перемещение
      const startTime = performance.now();
      const duration = 500; // 500ms для анимации
      const startPosition = position;
      const targetPosition = position + scrollAmount;
      
      // Проверяем, не выходим ли за границы
      let finalTargetPosition = targetPosition;
      
      if (targetPosition < -totalWidth) {
         // Если прокрутили слишком вправо, анимированно перемещаемся в начало
         finalTargetPosition = 0;
      } else if (targetPosition > 0) {
         // Если прокрутили слишком влево, анимированно перемещаемся в конец
         finalTargetPosition = -totalWidth + cardWidth;
      }
      
      const animateScroll = (time: number) => {
         const elapsed = time - startTime;
         const progress = Math.min(elapsed / duration, 1);
         // Функция плавности (ease-in-out)
         const easeProgress = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
         
         const currentPosition = startPosition + ((finalTargetPosition - startPosition) * easeProgress);
         setPosition(currentPosition);
         
         if (progress < 1) {
            requestAnimationFrame(animateScroll);
         } else {
            setTimeout(() => {
               setIsManualScrolling(false);
            }, 100);
         }
      };
      
      requestAnimationFrame(animateScroll);
   };

   return (
      <section className="py-16">
         <h2 className="text-3xl font-bold mb-8 text-center">Наши услуги</h2>
         
         <div 
            className="relative mx-auto max-w-6xl px-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            ref={containerRef}
         >
            <Button 
               variant="outline" 
               size="icon" 
               className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
               onClick={() => scroll('left')}
            >
               <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <div className="overflow-hidden">
               <motion.div 
                  className="flex gap-6"
                  style={{ 
                     x: position,
                     transition: "none" // Отключаем анимацию framer-motion для более плавного движения
                  }}
               >
                  {extendedServices.map((service, index) => (
                     <motion.div 
                        key={`${service.id}-${index}`}
                        className="min-w-[300px] flex-shrink-0 overflow-visible"
                       
                     >
                        <Link to={`/services/${service.id}`}>
                           <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
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
            </div>
            
            <Button 
               variant="outline" 
               size="icon" 
               className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
               onClick={() => scroll('right')}
            >
               <ChevronRight className="h-6 w-6" />
            </Button>
         </div>
         
         <div className="text-center mt-8">
            <Link to="/services">
               <Button variant="outline" className="px-6 py-2 hover:bg-primary hover:text-white transition-colors">
                  Все услуги
               </Button>
            </Link>
         </div>
      </section>
   );
};