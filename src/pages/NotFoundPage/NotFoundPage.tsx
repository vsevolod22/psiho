import { Link } from 'react-router-dom';
import { Container } from '@/widgets/Container';

export const NotFoundPage = () => {
   return (
      <Container className="flex flex-col items-center justify-center py-20">
         <h1 className="text-4xl font-bold mb-6">404</h1>
         <p className="text-xl mb-8">Страница не найдена</p>
         <Link 
            to="/" 
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
         >
            На главную
         </Link>
      </Container>
   );
};
