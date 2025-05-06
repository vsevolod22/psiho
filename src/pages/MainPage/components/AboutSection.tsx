import { Button } from '@/shared/ui/button';
import { Link } from 'react-router-dom';

export const AboutSection = () => {
   return (
      <section className="py-16">
         <h2 className="text-3xl font-bold mb-10 text-center">О ЦЕНТРЕ «НАВИГАТОР РАЗВИТИЯ ТАЛАНТОВ»</h2>
         <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
               "Навигатор развития талантов" – консультационно-диагностический центр при Академии психологии 
               и педагогики ЮФУ, предлагающий широкий спектр услуг для развития детей, подростков и их родителей.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
               <div className="bg-background-secondary p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Наши ключевые преимущества:</h3>
                  <ul className="space-y-2">
                     <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>Опытные специалисты с профильным образованием</span>
                     </li>
                     <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>Индивидуальный подход к каждому клиенту</span>
                     </li>
                     <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>Научно обоснованные методики диагностики и развития</span>
                     </li>
                     <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>Доступные цены на все услуги центра</span>
                     </li>
                  </ul>
               </div>
               
               <div className="bg-background-secondary p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Основные направления работы:</h3>
                  <ul className="space-y-2">
                     <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Диагностика способностей и талантов</span>
                     </li>
                     <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Психологическое консультирование</span>
                     </li>
                     <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Развивающие программы для детей и подростков</span>
                     </li>
                     <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Поддержка родителей в вопросах воспитания</span>
                     </li>
                  </ul>
               </div>
            </div>
            
            <div className="text-center mt-8">
               <Link to="/about">
                  <Button variant="outline" className="rounded-full">
                     Подробнее о центре
                  </Button>
               </Link>
            </div>
         </div>
      </section>
   );
};