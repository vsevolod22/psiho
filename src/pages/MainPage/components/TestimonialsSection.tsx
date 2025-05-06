import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/utils/lib/utils';


export const TestimonialsSection = () => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isAutoplay, setIsAutoplay] = useState(true);
   const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
   const [dragStartX, setDragStartX] = useState(0);
   const [isDragging, setIsDragging] = useState(false);
   
   const testimonials = [
      {
         id: 1,
         name: 'Анна Иванова',
         role: 'Мама двоих детей',
         text: 'Благодаря центру я смогла лучше понять своего ребенка и его потребности. Специалисты помогли выявить его сильные стороны и таланты. Рекомендую всем родителям!',
         photo: 'https://randomuser.me/api/portraits/women/1.jpg',
         rating: 5,
      },
      {
         id: 2,
         name: 'Сергей Петров',
         role: 'Отец подростка',
         text: 'Профессиональный подход и внимательное отношение к детям. Мой сын с удовольствием посещает занятия и показывает отличные результаты. Очень доволен сотрудничеством с центром.',
         photo: 'https://randomuser.me/api/portraits/men/1.jpg',
         rating: 5,
      },
      {
         id: 3,
         name: 'Елена Смирнова',
         role: 'Мама дочери 8 лет',
         text: 'Арт-терапия в центре помогла моей дочери справиться с тревожностью и раскрыть творческий потенциал. Спасибо за индивидуальный подход и поддержку!',
         photo: 'https://randomuser.me/api/portraits/women/2.jpg',
         rating: 4,
      },
   ];

   // Автоматическое переключение отзывов
   useEffect(() => {
      if (isAutoplay) {
         autoplayTimeoutRef.current = setTimeout(() => {
            goToNext();
         }, 8000); // Увеличенное время для чтения отзыва
      }
      
      return () => {
         if (autoplayTimeoutRef.current) {
            clearTimeout(autoplayTimeoutRef.current);
         }
      };
   }, [currentIndex, isAutoplay]);

   const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
   };

   const goToPrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
   };

   const goToIndex = (index: number) => {
      setCurrentIndex(index);
   };

   // Обработчики для свайпа на мобильных устройствах
   const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      setIsAutoplay(false);
      
      // Получаем начальную позицию касания/клика
      if ('touches' in e) {
         setDragStartX(e.touches[0].clientX);
      } else {
         setDragStartX(e.clientX);
      }
   };

   const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return;
      
      setIsDragging(false);
      setIsAutoplay(true);
      
      // Получаем конечную позицию
      let endX = 0;
      if ('changedTouches' in e) {
         endX = e.changedTouches[0].clientX;
      } else {
         endX = e.clientX;
      }
      
      // Определяем направление свайпа
      const diff = endX - dragStartX;
      if (Math.abs(diff) > 50) { // Минимальное расстояние для свайпа
         if (diff > 0) {
            goToPrev();
         } else {
            goToNext();
         }
      }
   };

   // Варианты анимации для карточки отзыва - исправлены для устранения тряски
   const cardVariants = {
      enter: (direction: number) => ({
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         width: '100%',
         x: direction > 0 ? '100%' : '-100%',
         opacity: 1,
         scale: 1,
         zIndex: 0,
      }),
      center: {
         position: 'relative',
         width: '100%',
         x: 0,
         opacity: 1,
         scale: 1,
         zIndex: 1,
         transition: {
            x: { type: "tween", ease: "easeInOut", duration: 0.5 },
            opacity: { duration: 0.3 },
         }
      },
      exit: (direction: number) => ({
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         width: '100%',
         x: direction < 0 ? '100%' : '-100%',
         opacity: 1,
         scale: 1,
         zIndex: 0,
         transition: {
            x: { type: "tween", ease: "easeInOut", duration: 0.5 },
            opacity: { duration: 0.3 },
         }
      })
   };

   // Направление анимации
   const [[page, direction], setPage] = useState([0, 0]);

   // Обновление индекса с учетом направления
   const paginate = (newDirection: number) => {
      if (newDirection > 0) {
         goToNext();
      } else {
         goToPrev();
      }
      setPage([page + newDirection, newDirection]);
   };

   // Рендер звездочек рейтинга
   const renderStars = (rating: number) => {
      return Array(5).fill(0).map((_, i) => (
         <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
         >
            <Star 
               className={cn(
                  "h-5 w-5", 
                  i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
               )} 
            />
         </motion.div>
      ));
   };

   return (
      <section className="py-20 relative overflow-hidden">
         {/* Фоновые декоративные элементы */}
         <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background z-0 pointer-events-none"></div>
         <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
         <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
         
         <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
               <motion.h2 
                  className="text-4xl font-bold mb-4 bg-clip-text  bg-gradient-to-r from-primary to-primary/70"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
               >
                  Отзывы наших клиентов
               </motion.h2>
               <motion.div 
                  className="w-24 h-1 bg-primary mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
               ></motion.div>
            </div>
            
            <div 
               className="relative max-w-5xl mx-auto"
               onMouseEnter={() => setIsAutoplay(false)}
               onMouseLeave={() => setIsAutoplay(true)}
               onTouchStart={handleDragStart}
               onTouchEnd={handleDragEnd}
               onMouseDown={handleDragStart}
               onMouseUp={handleDragEnd}
               onMouseLeave={() => isDragging && handleDragEnd}
            >
               <div className="overflow-hidden px-4 py-8 relative" style={{ minHeight: '400px' }}>
                  {/* Изменен режим AnimatePresence и добавлен фиксированный минимальный размер */}
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                     <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={cardVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="w-full"
                     >
                        <div className="bg-background/80 backdrop-blur-lg rounded-2xl shadow-xl border border-primary/10 overflow-hidden">
                           <div className="md:flex">
                              {/* Фото и информация о клиенте */}
                              <div className="md:w-1/3 bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex flex-col items-center justify-center">
                                 <motion.div 
                                    className="relative mb-4"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                 >
                                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl transform scale-90"></div>
                                    <img 
                                       src={testimonials[currentIndex].photo} 
                                       alt={testimonials[currentIndex].name} 
                                       className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg relative z-10"
                                    />
                                 </motion.div>
                                 
                                 <motion.h3 
                                    className="text-xl font-bold text-center"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                 >
                                    {testimonials[currentIndex].name}
                                 </motion.h3>
                                 
                                 <motion.p 
                                    className="text-muted-foreground text-center mb-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                 >
                                    {testimonials[currentIndex].role}
                                 </motion.p>
                                 
                                 <motion.div 
                                    className="flex space-x-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                 >
                                    {renderStars(testimonials[currentIndex].rating)}
                                 </motion.div>
                              </div>
                              
                              {/* Текст отзыва */}
                              <div className="md:w-2/3 p-8 md:p-10 flex flex-col justify-center">
                                 <Quote className="text-primary/30 h-12 w-12 mb-4" />
                                 
                                 <motion.p 
                                    className="text-lg md:text-xl leading-relaxed mb-6 italic"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                 >
                                    {testimonials[currentIndex].text}
                                 </motion.p>
                                 
                                 <motion.div 
                                    className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                 >
                                    <motion.div 
                                       className="h-full bg-primary rounded-full"
                                       initial={{ width: "0%" }}
                                       animate={{ width: "100%" }}
                                       transition={{ 
                                          duration: 8, 
                                          ease: "linear",
                                          repeat: isAutoplay ? Infinity : 0,
                                          repeatType: "loop"
                                       }}
                                    />
                                 </motion.div>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  </AnimatePresence>
               </div>
               
               {/* Навигация */}
               <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
                  <Button 
                     variant="outline" 
                     size="icon" 
                     onClick={() => paginate(-1)}
                     className="rounded-full shadow-md hover:shadow-lg transition-all hover:bg-primary hover:text-white border-primary/20 w-12 h-12"
                  >
                     <ChevronLeft className="h-6 w-6" />
                  </Button>
                  
                  <div className="flex gap-3">
                     {testimonials.map((_, index) => (
                        <motion.button
                           key={index}
                           className={`w-8 h-3 rounded-full transition-all duration-300 border ${
                              index === currentIndex 
                                 ? 'bg-primary w-8' 
                                 : 'bg-primary/30 hover:bg-primary/50'
                           }`}
                           onClick={() => {
                              setPage([index, index > currentIndex ? 1 : -1]);
                              goToIndex(index);
                           }}
                           whileHover={{ scale: 1.2 }}
                           whileTap={{ scale: 0.9 }}
                        />
                     ))}
                  </div>
                  
                  <Button 
                     variant="outline" 
                     size="icon" 
                     onClick={() => paginate(1)}
                     className="rounded-full shadow-md hover:shadow-lg transition-all hover:bg-primary hover:text-white border-primary/20 w-12 h-12"
                  >
                     <ChevronRight className="h-6 w-6" />
                  </Button>
               </div>
            </div>
         </div>
      </section>
   );
};