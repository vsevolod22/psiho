import { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import confetti from 'canvas-confetti';
import { useFetchProfessions, IProfession } from '../model/api/getPorfessions';
import { useProfessionStore } from '../model/store/professionStore';
import { useRouletteStore } from './local-store/rouletteStore';

interface RouletteProps {
  onFinish: (profession: IProfession) => void;
}

export const Roulette = ({ onFinish }: RouletteProps) => {
  // Используем стор вместо локальных состояний
  const {
    isSpinning, 
    itemsToShow, 
    scrollPosition, 
    showHighlight, 
    visibleProfessionIndex,
    centerProfession,
    setIsSpinning,
    setItemsToShow,
    setScrollPosition,
    setShowHighlight,
    setVisibleProfessionIndex,
    setCenterProfession
  } = useRouletteStore();
  
  const { data: professions, isLoading, isError } = useFetchProfessions();
  const { setSelectedProfession } = useProfessionStore();
  const animationRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rouletteContainerRef = useRef<HTMLDivElement>(null);
  
  // Инициализация элементов при загрузке профессий и звука
  useEffect(() => {
    // Инициализация звука
    audioRef.current = new Audio('./sounds/tick.mp3');
    audioRef.current.volume = 0.3;
    
    // Инициализация элементов при загрузке профессий
    if (professions && professions.length > 0) {
      const initialItems: IProfession[] = [];
      
      for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * professions.length);
        initialItems.push(professions[randomIndex]);
      }
      
      setItemsToShow(initialItems);
    }
    
    // Очистка ресурсов при размонтировании
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [professions, setItemsToShow]);
  
  // Определение профессии в центре
  const updateCenterProfession = () => {
    if (!rouletteContainerRef.current || itemsToShow.length === 0) return;
    
    const containerRect = rouletteContainerRef.current.getBoundingClientRect();
    const itemWidth = 200; // Ширина элемента в пикселях
    
    // Вычисляем индекс элемента, который находится в центре
    const centerIndex = Math.floor((scrollPosition + containerRect.width / 2) / itemWidth);
    
    // Проверяем, что индекс находится в пределах массива
    if (centerIndex >= 0 && centerIndex < itemsToShow.length) {
      const visibleProfession = itemsToShow[centerIndex - 1];
      
      // Проверка на null или undefined
      if (!visibleProfession) {
        console.log('Видимая профессия не определена, индекс:', centerIndex - 1);
        return;
      }
      
      // Находим оригинальную профессию по названию в массиве всех профессий
      if (professions) {
        const originalProfession = professions.find(p => p.name === visibleProfession.name);
        if (originalProfession) {
          setCenterProfession(originalProfession);
          console.log('Центральная профессия:', originalProfession.name, 'ID:', originalProfession.id);
        } else {
          // Если не нашли в оригинальном массиве, используем текущую
          setCenterProfession(visibleProfession);
          console.log('Используем видимую профессию:', visibleProfession.name);
        }
      } else {
        setCenterProfession(visibleProfession);
      }
    }
  };
  
  // Обновляем центральную профессию при изменении позиции прокрутки
  useEffect(() => {
    updateCenterProfession();
  }, [scrollPosition]);
  
  // Воспроизведение звука тика
  const playTickSound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log('Ошибка воспроизведения звука:', e));
      }
    } catch (e) {
      console.log('Ошибка воспроизведения звука:', e);
    }
  };
  
  // Запуск вращения рулетки
  const startSpin = () => {
    if (isSpinning || !professions || professions.length === 0) return;
    
    // Сброс состояний
    setIsSpinning(true);
    
    // Определение выигрышного элемента
    const winningItemIndex = Math.floor(Math.random() * professions.length);
    const winningProfession = professions[winningItemIndex];
    
    // Создание массива элементов для прокрутки (много случайных + выигрышный в конце)
    const totalItems = 50; // Общее количество элементов для прокрутки
    const items: IProfession[] = [];
    
    // Заполнение случайными элементами
    for (let i = 0; i < totalItems - 1; i++) {
      const randomIndex = Math.floor(Math.random() * professions.length);
      items.push(professions[randomIndex]);
    }
    
    // Добавление выигрышного элемента в конец
    items.push(winningProfession);
    
    setItemsToShow(items);
    setScrollPosition(0);
    
    // Начальные параметры анимации
    let startTime = performance.now();
    const duration = 7000; // Длительность анимации в мс
    const itemWidth = 200; // Ширина элемента в пикселях
    const totalDistance = (totalItems - 8) * itemWidth; // Общее расстояние прокрутки
    
    // Функция анимации
    const animate = (timestamp: number) => {
      // Прошедшее время
      const elapsed = timestamp - startTime;
      
      // Коэффициент прогресса (от 0 до 1)
      const progress = Math.min(elapsed / duration, 1);
      
      // Функция замедления (easeOutExpo)
      const easeOut = (t: number) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      };
      
      // Применение функции замедления
      const easedProgress = easeOut(progress);
      
      // Расчет текущей позиции прокрутки
      const newPosition = easedProgress * totalDistance;
      setScrollPosition(newPosition);
      
      // Определение текущего видимого элемента (для звука тика)
      const currentItemIndex = Math.floor(newPosition / itemWidth);
      if (currentItemIndex !== visibleProfessionIndex && currentItemIndex < totalItems - 1) {
        setVisibleProfessionIndex(currentItemIndex);
        playTickSound();
        
        // Обновляем профессию в центре при каждом тике
        updateCenterProfession();
      }
      
      // Продолжение анимации, если не достигнут конец
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Анимация завершена - вместо проверки centerProfession, вычисляем финальную профессию напрямую
        
        // Получаем текущее положение контейнера
        const containerRect = rouletteContainerRef.current?.getBoundingClientRect();
        if (containerRect) {
          // Вычисляем индекс элемента, который находится в центре
          const centerIndex = Math.floor((newPosition + containerRect.width / 2) / itemWidth);
          
          // Проверяем, что индекс находится в пределах массива
          if (centerIndex >= 0 && centerIndex < items.length) {
            const visibleProfession = items[centerIndex - 1];
            
            // Находим оригинальную профессию по названию в массиве всех профессий
            if (professions && visibleProfession) {
              const originalProfession = professions.find(p => p.name === visibleProfession.name);
              if (originalProfession) {
                console.log('Финальная профессия:', originalProfession.name, 'ID:', originalProfession.id);
                finishSpin(originalProfession);
              } else {
                finishSpin(visibleProfession);
              }
            } else if (visibleProfession) {
              finishSpin(visibleProfession);
            } else {
              // Если по какой-то причине visibleProfession не определен, используем последний элемент
              const finalProfession = items[items.length - 1];
              finishSpin(finalProfession);
            }
          } else {
            // Если по какой-то причине centerIndex не в пределах массива, используем последний элемент
            const finalProfession = items[items.length - 1];
            finishSpin(finalProfession);
          }
        } else {
          // Если не удалось получить размеры контейнера, используем последний элемент
          const finalProfession = items[items.length - 1];
          finishSpin(finalProfession);
        }
      }
    };
    
    // Запуск анимации
    animationRef.current = requestAnimationFrame(animate);
  };
  
  // Завершение вращения
  const finishSpin = (profession: IProfession) => {
    // Подсветка выигрышного элемента
    setShowHighlight(true);
    
    // Звук выигрыша
    try {
      const winSound = new Audio('/sounds/win.mp3');
      winSound.play().catch(e => console.log('Ошибка воспроизведения звука:', e));
    } catch (e) {
      console.log('Ошибка воспроизведения звука:', e);
    }
    
    // Запуск конфетти
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    setIsSpinning(false);
    
    // Находим оригинальную профессию по имени в массиве всех профессий
    // для гарантии получения правильного ID
    let professionToSave = profession;
    if (professions) {
      const originalProfession = professions.find(p => p.name === profession.name);
      if (originalProfession) {
        professionToSave = originalProfession;
      }
    }
    
    console.log('Выбранная профессия:', professionToSave.name, 'ID:', professionToSave.id);
    
    // Сохраняем в сторе и передаем в колбэк
    setSelectedProfession(professionToSave);
    onFinish(professionToSave);
    
    setTimeout(() => {
      setShowHighlight(false);
    }, 1000);
  };
  
  // Получение цвета для профессии (на основе ID)
  const getProfessionColor = (id: number) => {
    const colors = [
      'bg-pink-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
      'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-orange-500'
    ];
    return colors[(id - 1) % colors.length];
  };
  
  // Получение иконки для профессии (на основе ID или img)
  const getProfessionIcon = (profession: IProfession) => {
    // Если img равно 'img', используем иконку по умолчанию на основе ID
    if (!profession.img || profession.img === 'img') {
      const icons = ['🎨', '🎵', '👑', '⚙️', '👥', '🗣️', '🧠', '⚽'];
      return icons[(profession.id - 1) % icons.length];
    }
    // Иначе используем img как иконку
    return profession.img;
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (isError || !professions || professions.length === 0) {
    return (
      <div className="text-center p-8 bg-red-100 rounded-lg">
        <p className="text-red-600 font-semibold">Ошибка при загрузке профессий</p>
        <Button 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Попробовать снова
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="relative">
    
        <div 
          ref={rouletteContainerRef}
          className="relative h-80 overflow-hidden rounded-2xl border-4 border-primary/50 shadow-2xl bg-gradient-to-b from-gray-900 to-gray-800"
        >
     
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
          
        
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
          
     
          <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-primary to-primary/50 z-20 rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.7)]"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[18px] border-l-transparent border-r-transparent border-t-primary z-30 filter drop-shadow-lg"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[18px] border-l-transparent border-r-transparent border-b-primary z-30 filter drop-shadow-lg"></div>
          
         
          <div className={`absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-[32px] bg-primary/10 z-10 ${showHighlight ? 'animate-pulse bg-primary/30' : ''}`}></div>
          
     
          <div 
            className="absolute top-0 bottom-0 left-0 flex items-center transition-transform"
            style={{ transform: `translateX(${-scrollPosition}px)` }}
          >
            {itemsToShow.map((item, index) => (
              <div 
                key={`item-${index}`} 
                className="flex-shrink-0 w-[200px] h-[180px] mx-[1px] flex items-center justify-center"
              >
                <Card 
                  className={`w-full h-full ${getProfessionColor(item.id)} text-white border-2 
                            ${index === itemsToShow.length - 1 && showHighlight 
                              ? 'border-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.5)]' 
                              : 'border-gray-700/50 bg-opacity-80'}`}
                >
                  <CardContent className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <div className="text-5xl mb-3">{getProfessionIcon(item)}</div>
                    <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button 
          size="large" 
          className={`px-8 py-6 rounded-full text-lg font-bold
              bg-gradient-to-r from-primary to-primary-dark
              shadow-md shadow-primary/20
              transition-all duration-300
              ${isSpinning ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-primary/30'}`}
          onClick={startSpin}
          disabled={isSpinning}
        >
          {isSpinning ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Вращение...
            </span>
          ) : (
            'Крутить рулетку'
          )}
        </Button>
      </div>
    </div>
  );
};