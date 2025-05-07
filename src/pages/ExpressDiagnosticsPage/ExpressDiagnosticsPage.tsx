import { useState, useRef, useEffect } from 'react';
import { Container } from '@/widgets/Container';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Test } from './components/Test';
import { Specialty, specialties, testResults, getQuestions } from './types';
import confetti from 'canvas-confetti';
import { Roulette } from './components/Roulette';

export const ExpressDiagnosticsPage = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [showTest, setShowTest] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle roulette finish
  const handleRouletteFinish = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    setIsLoading(true);
    
    // Имитация загрузки теста с небольшой задержкой
    setTimeout(() => {
      setIsLoading(false);
      setShowTest(true);
    }, 2000); // Задержка в 2 секунды для имитации загрузки
  };
  
  // Restart test
  const restartTest = () => {
    setSelectedSpecialty(null);
    setShowTest(false);
    setIsLoading(false);
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
          {!isLoading && !showTest && !selectedSpecialty ? (
            <motion.div
              key="roulette"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-4xl mx-auto mb-12">
                <Roulette 
                  specialties={specialties} 
                  onFinish={handleRouletteFinish} 
                />
              </div>
            </motion.div>
          ) : isLoading && selectedSpecialty ? (
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
                    <div className={`text-4xl p-3 rounded-full ${selectedSpecialty.color} text-white mr-4`}>
                      {selectedSpecialty.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedSpecialty.title}</h2>
                      <p className="text-gray-500">{selectedSpecialty.description}</p>
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
                    <p className="text-gray-500 mt-2 text-center">Подготавливаем вопросы для оценки ваших способностей в области "{selectedSpecialty.title}"</p>
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
              {selectedSpecialty && showTest && (
                <Test 
                  specialty={selectedSpecialty} 
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