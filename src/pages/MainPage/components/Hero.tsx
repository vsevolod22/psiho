import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import { motion } from 'framer-motion';
import { ContactModal } from '@/widgets/ContactModal';

export const Hero = () => {
   return (
      <section className="py-16 flex flex-col items-center text-center">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
         >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
               Навигатор развития талантов
            </h1>
            <p className="text-xl max-w-3xl mb-10 leading-relaxed">
               Консультационно-диагностический центр при Академии психологии и педагогики ЮФУ, 
               помогающий раскрыть потенциал детей и подростков
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
      </section>
   );
};