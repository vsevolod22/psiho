import { useState, useRef, useEffect } from 'react';
import { Container } from '@/widgets/Container';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import confetti from 'canvas-confetti';

// Типы для специальностей и вопросов
interface Specialty {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface Question {
  id: number;
  text: string;
  options: {
    id: number;
    text: string;
    score: number;
  }[];
}

interface TestResult {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
}

// Данные о специальностях
const specialties: Specialty[] = [
  {
    id: 1,
    title: 'Творческие способности',
    description: 'Оценка творческого потенциала и креативного мышления',
    icon: '🎨',
    color: 'bg-pink-500',
  },
  {
    id: 2,
    title: 'Технические навыки',
    description: 'Определение склонности к техническим и инженерным наукам',
    icon: '⚙️',
    color: 'bg-blue-500',
  },
  {
    id: 3,
    title: 'Социальные способности',
    description: 'Оценка коммуникативных навыков и эмпатии',
    icon: '👥',
    color: 'bg-green-500',
  },
  {
    id: 4,
    title: 'Аналитическое мышление',
    description: 'Определение способностей к логическому и аналитическому мышлению',
    icon: '🧠',
    color: 'bg-purple-500',
  },
  {
    id: 5,
    title: 'Лидерские качества',
    description: 'Оценка организаторских способностей и лидерского потенциала',
    icon: '👑',
    color: 'bg-yellow-500',
  },
  {
    id: 6,
    title: 'Языковые способности',
    description: 'Определение склонности к изучению языков и лингвистике',
    icon: '🗣️',
    color: 'bg-red-500',
  },
  {
    id: 7,
    title: 'Музыкальные таланты',
    description: 'Оценка музыкального слуха и чувства ритма',
    icon: '🎵',
    color: 'bg-indigo-500',
  },
  {
    id: 8,
    title: 'Спортивные способности',
    description: 'Определение физических данных и координации',
    icon: '⚽',
    color: 'bg-orange-500',
  },
];

// Тестовые вопросы (для примера - одинаковые для всех специальностей)
const getQuestions = (specialtyId: number): Question[] => {
  // В реальном приложении здесь будут разные вопросы для разных специальностей
  return [
    {
      id: 1,
      text: 'Насколько вам нравится решать сложные задачи в этой области?',
      options: [
        { id: 1, text: 'Совсем не нравится', score: 0 },
        { id: 2, text: 'Скорее не нравится', score: 1 },
        { id: 3, text: 'Нейтрально', score: 2 },
        { id: 4, text: 'Скорее нравится', score: 3 },
        { id: 5, text: 'Очень нравится', score: 4 },
      ],
    },
    {
      id: 2,
      text: 'Как часто вы занимаетесь деятельностью, связанной с этой областью?',
      options: [
        { id: 1, text: 'Никогда', score: 0 },
        { id: 2, text: 'Очень редко', score: 1 },
        { id: 3, text: 'Иногда', score: 2 },
        { id: 4, text: 'Часто', score: 3 },
        { id: 5, text: 'Постоянно', score: 4 },
      ],
    },
    {
      id: 3,
      text: 'Насколько легко вам даются задания в этой сфере?',
      options: [
        { id: 1, text: 'Очень сложно', score: 0 },
        { id: 2, text: 'Скорее сложно', score: 1 },
        { id: 3, text: 'Средне', score: 2 },
        { id: 4, text: 'Скорее легко', score: 3 },
        { id: 5, text: 'Очень легко', score: 4 },
      ],
    },
    {
      id: 4,
      text: 'Получаете ли вы удовольствие от деятельности в этой области?',
      options: [
        { id: 1, text: 'Совсем нет', score: 0 },
        { id: 2, text: 'Скорее нет', score: 1 },
        { id: 3, text: 'Нейтрально', score: 2 },
        { id: 4, text: 'Скорее да', score: 3 },
        { id: 5, text: 'Определенно да', score: 4 },
      ],
    },
    {
      id: 5,
      text: 'Хотели бы вы развиваться в этом направлении в будущем?',
      options: [
        { id: 1, text: 'Точно нет', score: 0 },
        { id: 2, text: 'Скорее нет', score: 1 },
        { id: 3, text: 'Возможно', score: 2 },
        { id: 4, text: 'Скорее да', score: 3 },
        { id: 5, text: 'Определенно да', score: 4 },
      ],
    },
  ];
};

// Результаты теста
const testResults: TestResult[] = [
  {
    minScore: 0,
    maxScore: 5,
    title: 'Низкий потенциал',
    description: 'В данной области у вас пока не выявлено значительных способностей. Возможно, ваши таланты лежат в другой сфере.',
  },
  {
    minScore: 6,
    maxScore: 10,
    title: 'Средний потенциал',
    description: 'У вас есть определенные задатки в этой области. При желании вы можете развить эти навыки с помощью регулярных занятий.',
  },
  {
    minScore: 11,
    maxScore: 15,
    title: 'Высокий потенциал',
    description: 'Вы демонстрируете хорошие способности в этой области. Рекомендуем обратить внимание на развитие этих талантов.',
  },
  {
    minScore: 16,
    maxScore: 20,
    title: 'Выдающийся потенциал',
    description: 'У вас выявлены выдающиеся способности в данной области! Рекомендуем серьезно заняться развитием этого таланта.',
  },
];

export const ExpressDiagnosticsPage = () => {
  // Состояния
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [visibleSpecialtyIndex, setVisibleSpecialtyIndex] = useState(0);
  const [spinSpeed, setSpinSpeed] = useState(100);
  const [showTest, setShowTest] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  
  const spinTimerRef = useRef<NodeJS.Timeout | null>(null);
  const spinCountRef = useRef(0);
  const maxSpinCount = useRef(Math.floor(Math.random() * 20) + 30); // Случайное количество прокруток
  
  // Запуск рулетки
  const startSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowTest(false);
    setShowResults(false);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTotalScore(0);
    spinCountRef.current = 0;
    maxSpinCount.current = Math.floor(Math.random() * 20) + 30;
    setSpinSpeed(100);
    
    const spin = () => {
      setVisibleSpecialtyIndex((prev) => (prev + 1) % specialties.length);
      spinCountRef.current += 1;
      
      // Постепенно замедляем вращение
      if (spinCountRef.current > maxSpinCount.current * 0.7) {
        setSpinSpeed((prev) => Math.min(prev + 20, 500));
      }
      
      if (spinCountRef.current < maxSpinCount.current) {
        spinTimerRef.current = setTimeout(spin, spinSpeed);
      } else {
        // Остановка рулетки
        setIsSpinning(false);
        setSelectedSpecialty(specialties[visibleSpecialtyIndex]);
        
        // Запускаем конфетти
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        // Показываем тест через небольшую задержку
        setTimeout(() => {
          setShowTest(true);
        }, 1000);
      }
    };
    
    spinTimerRef.current = setTimeout(spin, spinSpeed);
  };
  
  // Очистка таймера при размонтировании компонента
  useEffect(() => {
    return () => {
      if (spinTimerRef.current) {
        clearTimeout(spinTimerRef.current);
      }
    };
  }, []);
  
  // Обработка ответа на вопрос
  const handleAnswer = (questionId: number, score: number) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);
    
    // Переход к следующему вопросу или показ результатов
    if (currentQuestionIndex < getQuestions(selectedSpecialty?.id || 0).length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Подсчет общего балла
      const total = Object.values(newAnswers).reduce((sum, score) => sum + score, 0);
      setTotalScore(total);
      setShowResults(true);
    }
  };
  
  // Получение результата теста
  const getTestResult = () => {
    return testResults.find(
      result => totalScore >= result.minScore && totalScore <= result.maxScore
    );
  };
  
  // Перезапуск теста
  const restartTest = () => {
    setSelectedSpecialty(null);
    setShowTest(false);
    setShowResults(false);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTotalScore(0);
  };
  
  return (
    <Container>
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
            Экспресс-диагностика талантов
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Прокрутите рулетку, чтобы определить область для тестирования ваших способностей.
            Пройдите короткий тест и узнайте свой потенциал в выбранной сфере!
          </p>
        </motion.div>
        
        {!showTest && !selectedSpecialty && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="relative">
              {/* Декоративный элемент - указатель */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[30px] border-l-transparent border-r-transparent border-t-primary z-10"></div>
              
              {/* Рулетка */}
              <div className="relative h-80 overflow-hidden rounded-xl border-4 border-primary shadow-xl bg-gradient-to-b from-gray-50 to-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={visibleSpecialtyIndex}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Card className={`w-4/5 h-3/5 ${specialties[visibleSpecialtyIndex].color} text-white`}>
                      <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                        <div className="text-6xl mb-4">{specialties[visibleSpecialtyIndex].icon}</div>
                        <h3 className="text-2xl font-bold mb-2">{specialties[visibleSpecialtyIndex].title}</h3>
                        <p>{specialties[visibleSpecialtyIndex].description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <Button 
                size="large" 
                className="px-8 py-6 rounded-full text-lg font-bold"
                onClick={startSpin}
                disabled={isSpinning}
              >
                {isSpinning ? 'Вращается...' : 'Крутить рулетку!'}
              </Button>
            </div>
          </motion.div>
        )}
        
        {selectedSpecialty && !showTest && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto text-center"
          >
            <Card className={`${selectedSpecialty.color} text-white mb-8`}>
              <CardContent className="p-8">
                <div className="text-7xl mb-4">{selectedSpecialty.icon}</div>
                <h2 className="text-3xl font-bold mb-4">{selectedSpecialty.title}</h2>
                <p className="text-xl">{selectedSpecialty.description}</p>
              </CardContent>
            </Card>
            <p className="text-lg mb-6">Тест скоро начнется...</p>
          </motion.div>
        )}
        
        {showTest && selectedSpecialty && !showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-full ${selectedSpecialty.color} text-white flex items-center justify-center text-2xl mr-4`}>
                    {selectedSpecialty.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{selectedSpecialty.title}</h2>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Вопрос {currentQuestionIndex + 1} из {getQuestions(selectedSpecialty.id).length}</span>
                    <span>{Math.round(((currentQuestionIndex + 1) / getQuestions(selectedSpecialty.id).length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${((currentQuestionIndex + 1) / getQuestions(selectedSpecialty.id).length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <h3 className="text-xl font-medium mb-6">
                  {getQuestions(selectedSpecialty.id)[currentQuestionIndex].text}
                </h3>
                
                <div className="space-y-3">
                  {getQuestions(selectedSpecialty.id)[currentQuestionIndex].options.map((option) => (
                    <Button
                      key={option.id}
                      variant={answers[getQuestions(selectedSpecialty.id)[currentQuestionIndex].id] === option.score ? "default" : "outline"}
                      className="w-full justify-start text-left py-4 h-auto"
                      onClick={() => handleAnswer(getQuestions(selectedSpecialty.id)[currentQuestionIndex].id, option.score)}
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {showResults && selectedSpecialty && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="mb-8 overflow-hidden">
              <div className={`${selectedSpecialty.color} text-white p-8 text-center`}>
                <div className="text-7xl mb-4">{selectedSpecialty.icon}</div>
                <h2 className="text-3xl font-bold mb-2">{selectedSpecialty.title}</h2>
                <p className="text-xl">Ваш результат: {totalScore} из {getQuestions(selectedSpecialty.id).length * 4} баллов</p>
              </div>
              
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">{getTestResult()?.title}</h3>
                <p className="text-lg mb-6">{getTestResult()?.description}</p>
                
                <div className="border p-6 rounded-lg mb-6">
                  <h4 className="font-bold mb-3">Рекомендации:</h4>
                  <p>
                    {totalScore <= 10 
                      ? 'Рекомендуем пройти более подробную диагностику в нашем центре, чтобы определить ваши сильные стороны в других областях.' 
                      : 'Рекомендуем записаться на консультацию к нашим специалистам для разработки индивидуальной программы развития ваших способностей.'}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={restartTest} variant="outline">
                    Пройти тест снова
                  </Button>
                  <Button>
                    Записаться на консультацию
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </section>
    </Container>
  );
};