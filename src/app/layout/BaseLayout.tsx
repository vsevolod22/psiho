import { Outlet } from 'react-router-dom';
import { useTokenStore } from '@/modules/Auth/model/store/authStore';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher';
import { AuthModal } from '@/modules/Auth/ui/AuthModal';
import NonAuthImage from '@/shared/assets/NonAuthImage.png';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';

const BaseLayout = () => {
   const { accessToken } = useTokenStore();

   return (
      <>
         
            <div className='flex min-h-screen flex-col bg-background'>
               <Header />
               <main className='flex-1 py-8'>
                  <Outlet />
               </main>
               <Footer />
            </div>
         
      </>
   );
};

export default BaseLayout;
