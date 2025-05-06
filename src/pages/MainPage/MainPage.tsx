
import { Container } from '@/widgets/Container';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';

import { CallToAction } from './components/CallToAction';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactForm } from './components/ContactForm';


export const MainPage = () => {
   return (
      <Container>
         <Hero />
         <AboutSection />
         <CallToAction />
         <ServicesSection />
         <TestimonialsSection />
         <ContactForm />
      </Container>
   );
};
