import { Button } from '@/shared/ui/button';

export const CallToAction = () => {
   return (
      <section className="py-16 text-center">
         <h2 className="text-3xl font-bold mb-4">Начните путь к гармонии сегодня</h2>
         <p className="text-xl mb-8 max-w-2xl mx-auto">
            Не откладывайте заботу о психологическом благополучии вашего ребенка. 
            Запишитесь на консультацию прямо сейчас!
         </p>
         <Button size="large" className="px-8 rounded-full">Записаться на консультацию</Button>
      </section>
   );
};