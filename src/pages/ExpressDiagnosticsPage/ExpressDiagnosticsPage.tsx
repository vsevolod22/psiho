import { useState, useRef, useEffect } from 'react';
import { Container } from '@/widgets/Container';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

import { testResults, getQuestions } from './types';
import confetti from 'canvas-confetti';
import { Roulette } from '../../modules/Professions/ui/Roulette';
import { useFetchProfessions, IProfession } from '../../modules/Professions/model/api/getPorfessions';
import { Test } from '@/modules/Questions';
import { useProfessionStore } from '@/modules/Professions/model/store/professionStore';

// Адаптер для преобразования IProfession в Specialty
const adaptProfessionToSpecialty = (profession: IProfession) => {
  // Получение цвета и иконки на основе ID
  const getColor = (id: number) => {
    const colors = [
      'bg-pink-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
      'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-orange-500'
    ];
    return colors[(id - 1) % colors.length];
  };
  
  const getIcon = (id: number) => {
    const icons = ['🎨', '🎵', '👑', '⚙️', '👥', '🗣️', '🧠', '⚽'];
    return icons[(id - 1) % icons.length];
  };
  
  return {
    id: profession.id,
    title: profession.name,
    description: profession.description,
    icon: getIcon(profession.id),
    color: getColor(profession.id)
  };
};

// Компонент скелетона для загрузки профессий
const ProfessionsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative h-80 overflow-hidden rounded-2xl border-4 border-primary/50 shadow-2xl bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Боковые тени */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
        
        {/* Центральный указатель */}
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-primary to-primary/50 z-20 rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.7)]"></div>
        
        {/* Скелетоны карточек */}
        <div className="absolute top-0 bottom-0 left-0 flex items-center">
          {Array(5).fill(0).map((_, index) => (
            <div 
              key={`skeleton-${index}`} 
              className="flex-shrink-0 w-[200px] h-[180px] mx-[1px] flex items-center justify-center"
            >
              <div className="w-full h-full rounded-lg border-2 border-gray-700/50 bg-gray-800 animate-pulse flex flex-col items-center justify-center p-4">
                <div className="w-16 h-16 rounded-full bg-gray-700 mb-4 animate-pulse"></div>
                <div className="w-3/4 h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="w-1/2 h-4 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <div className="px-8 py-6 rounded-full w-48 h-16 bg-gray-800 animate-pulse"></div>
      </div>
    </div>
  );
};

export const ExpressDiagnosticsPage = () => {
  const { data: professions, isLoading: isLoadingProfessions } = useFetchProfessions();
  
  const {selectedProfession, setSelectedProfession} = useProfessionStore()
  const [showTest, setShowTest] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Обработка завершения рулетки
  const handleRouletteFinish = (profession: IProfession) => {
    setSelectedProfession(profession);
    setShowTest(true);
    
    
  };
  
  // Перезапуск теста
  const restartTest = () => {
    setSelectedProfession(null);
    setShowTest(false);
    setIsLoading(false);
  };
  
  // Если профессия имеет img="img", используем изображение по умолчанию
  const getImageUrl = (imgPath: string) => {
    return imgPath === 'img' ? '⚙️' : imgPath;
  };
  
  return (
    <Container>
      <section className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
            Экспресс-диагностика талантов
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Прокрутите рулетку, чтобы определить область для тестирования ваших способностей.
            Пройдите короткий тест и узнайте свой потенциал в выбранной сфере!
          </p>
        </div>
        
        <AnimatePresence mode="wait">
          {isLoadingProfessions ? (
            <motion.div
              key="professions-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProfessionsSkeleton />
            </motion.div>
          ) : !isLoading && !showTest && !selectedProfession ? (
            <motion.div
              key="roulette"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-4xl mx-auto mb-12">
                <Roulette 
                  onFinish={handleRouletteFinish} 
                />
              </div>
            </motion.div>
          ) : isLoading && selectedProfession ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="mb-8 border-2 border-primary/20 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className={`text-4xl p-3 rounded-full ${adaptProfessionToSpecialty(selectedProfession).color} text-white mr-4`}>
                      {adaptProfessionToSpecialty(selectedProfession).icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedProfession.name}</h2>
                      <p className="text-gray-500">{selectedProfession.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="mb-4">
                      <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <p className="text-xl font-medium text-center">Загружаем тест...</p>
                    <p className="text-gray-500 mt-2 text-center">Подготавливаем вопросы для оценки ваших способностей в области "{selectedProfession.name}"</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {selectedProfession && showTest && (
                <Test 
                  specialty={adaptProfessionToSpecialty(selectedProfession)} 
                  testResults={testResults}
                  onRestart={restartTest}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </Container>
  );
};