import { Container } from "./Container";


export const Footer = () => {
   return (
      <footer className="py-8 border-t border-border bg-background">
         <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div>
                  <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
                  <div className="space-y-2">
                     <p className="flex items-center gap-2">
                        <span className="text-muted-foreground">Адрес:</span>
                        <span>г. Москва, ул. Психологическая, д. 42</span>
                     </p>
                     <p className="flex items-center gap-2">
                        <span className="text-muted-foreground">Телефон:</span>
                        <a href="tel:+74951234567" className="hover:text-primary">
                           +7 (495) 123-45-67
                        </a>
                     </p>
                     <p className="flex items-center gap-2">
                        <span className="text-muted-foreground">Email:</span>
                        <a href="mailto:info@psychocenter.ru" className="hover:text-primary">
                           info@psychocenter.ru
                        </a>
                     </p>
                  </div>
               </div>
               
               <div>
                  <h3 className="text-lg font-semibold mb-4">Режим работы</h3>
                  <div className="space-y-2">
                     <p>Пн-Пт: 9:00 - 20:00</p>
                     <p>Сб: 10:00 - 18:00</p>
                     <p>Вс: выходной</p>
                  </div>
               </div>
               
               <div>
                  <h3 className="text-lg font-semibold mb-4">Социальные сети</h3>
                  <div className="flex space-x-4">
                     <a href="#" className="hover:text-primary">
                        ВКонтакте
                     </a>
                     <a href="#" className="hover:text-primary">
                        Telegram
                     </a>
                     <a href="#" className="hover:text-primary">
                        WhatsApp
                     </a>
                  </div>
               </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
               <p>© {new Date().getFullYear()} ПсихоЦентр. Все права защищены.</p>
            </div>
         </Container>
      </footer>
   );
};