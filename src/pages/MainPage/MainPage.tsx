
import { Container } from '@/widgets/Container';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';

import { CallToAction } from './components/CallToAction';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactForm } from '../../widgets/ContactForm';
import { ContactModal } from '@/widgets/ContactModal';


export const MainPage = () => {
   return (
      <Container>
         <Hero />
         <AboutSection />
         <CallToAction />
         <ServicesSection />
         <TestimonialsSection />
         <section className="py-16">
               <div className="max-w-2xl mx-auto text-center mb-10">
                  <h2 className="text-3xl font-bold mb-4">Свяжитесь с нами</h2>
                  <p className="text-lg">
                     Если у вас есть вопросы или вы хотите записаться на консультацию, 
                     заполните форму ниже, и мы свяжемся с вами в ближайшее время.
                  </p>
                  <ContactModal 
                     buttonText="Связаться с нами" 
                     buttonVariant="default" 
                     buttonSize="large"
                     className='w-1/2 mt-5'
                  />
               </div>
              
         
            </section>
        
         
               
      </Container>
   );
};
