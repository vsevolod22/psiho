import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { useFetchQuestions } from '../model/api/getQuestions';
import { useCalculateResults } from '../model/api/calculateResults';
import { useQuestionsStore } from '../model/store/questionsStore';

// Обновите интерфейс компонента Test, чтобы он принимал professionId
interface TestProps {
  onRestart: () => void;
  professionId: number;
  specialty: {
    id: number;
    title: string;
    description: string;
    icon: string;
    color: string;
  }
}

export const Test = ({ onRestart, professionId, specialty }: TestProps) => {
  // Используйте professionId для загрузки вопросов для конкретной профессии
  // Получаем данные из хранилища
  const { 
    currentQuestionIndex, 
    answers, 
    showResults, 
    testResults,
    setCurrentQuestionIndex, 
    addAnswer, 
    resetAnswers,
    setTestResults,
    setShowResults
  } = useQuestionsStore();
  
  // Получаем вопросы с сервера
  const { data: questions, isLoading: isQuestionsLoading, isError } = useFetchQuestions();
  
  // Мутация для отправки ответов
  const { mutate, isPending: isSubmitting, isError: isSubmitError } = useCalculateResults();
  
  // Обработчик ответа на вопрос
  const handleAnswer = (answerId: number) => {
    if (!questions) return;
    
    // Сохраняем ответ
    addAnswer(currentQuestionIndex, answerId);
    
    // Переходим к следующему вопросу или показываем результаты
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Отправляем ответы на сервер
      submitAnswers();
    }
  };
  
  // Отправка ответов на сервер
  const submitAnswers = () => {
    if (answers.some(answer => answer === undefined) || !questions) {
      console.error('Не на все вопросы даны ответы');
      return;
    }
    
    mutate(
      { answers }, 
      {
        onSuccess: (data) => {
          setTestResults(data);
          setShowResults(true);
        },
        onError: (error) => {
          console.error('Ошибка при отправке ответов:', error);
        }
      }
    );
  };
  
  // Обработчик перезапуска теста
  const handleRestart = () => {
    resetAnswers();
    onRestart();
  };
  
  // Если загружаем вопросы, показываем индикатор загрузки
  if (isQuestionsLoading) {
    return (
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
            <div className={`text-4xl p-3 rounded-full ${specialty.color} text-white mr-4`}>
              {specialty.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{specialty.title}</h2>
              <p className="text-gray-500">{specialty.description}</p>
              
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
            <p className="text-gray-500 mt-2 text-center">Подготавливаем вопросы для оценки ваших способностей в области "{specialty.title}"</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
    );
  }
  
  // Если произошла ошибка при загрузке вопросов
  if (isError || !questions || questions.length === 0) {
    return (
      <div className="text-center p-8 bg-red-100 rounded-lg">
        <p className="text-red-600 font-semibold">Ошибка при загрузке вопросов</p>
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
    <div className="max-w-3xl mx-auto">
      {!showResults ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 border-2 border-primary/20 shadow-xl">
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Вопрос {currentQuestionIndex + 1} из {questions.length}</span>
                  <span>Прогресс: {Math.round(((currentQuestionIndex) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-6">{questions[currentQuestionIndex].text}</h3>
              
              <div className="space-y-3">
                {questions[currentQuestionIndex].answers.map(answer => (
                  <Button
                    key={answer.id}
                    variant="outline"
                    className={`w-full justify-start text-left py-4 border-2 hover:border-primary hover:bg-primary/5 ${
                      answers[currentQuestionIndex] === answer.id ? 'border-primary bg-primary/10' : ''
                    }`}
                    onClick={() => handleAnswer(answer.id)}
                  >
                    {answer.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 border-2 border-primary/20 shadow-xl overflow-hidden">
            <div className="bg-primary p-6 text-white">
              <div className="flex items-center">
                <div className="text-5xl mr-4">📊</div>
                <div>
                  <h2 className="text-2xl font-bold">Результаты теста</h2>
                  <p className="opacity-80">Ваши способности и таланты</p>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              {isSubmitting ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : isSubmitError ? (
                <div className="text-center p-4 bg-red-100 rounded-lg mb-6">
                  <p className="text-red-600">Произошла ошибка при получении результатов</p>
                  <Button 
                    className="mt-4"
                    onClick={submitAnswers}
                  >
                    Попробовать снова
                  </Button>
                </div>
              ) : testResults ? (
                <>
                  <h3 className="text-2xl font-bold mb-6">Ваши результаты:</h3>
                  
                  <div className="space-y-4 mb-6">
                    {Object.entries(testResults).map(([id, result]) => (
                      <div key={id} className="bg-primary p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold">{result.name}:</span>
                          <span className="font-bold">{result.score} баллов</span>
                        </div>
                        <div className="w-full bg-primary rounded-full h-3">
                          <div 
                            className="bg-primary h-3 rounded-full" 
                            style={{ width: `${(result.score / 20) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-center py-4">Не удалось загрузить результаты</p>
              )}
              
              <div className="flex justify-center">
                <Button 
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-2"
                  onClick={handleRestart}
                >
                  Пройти новый тест
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};