import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Specialty, Question, TestResult, getQuestions } from '../types';

interface TestProps {
  specialty: Specialty;
  testResults: TestResult[];
  onRestart: () => void;
}

export const Test = ({ specialty, testResults, onRestart }: TestProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  
  const questions = getQuestions(specialty.id);
  
  // Handle answer to a question
  const handleAnswer = (questionId: number, score: number) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);
    
    // Move to next question or show results
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate total score
      const total = Object.values(newAnswers).reduce((sum, score) => sum + score, 0);
      setTotalScore(total);
      setShowResults(true);
    }
  };
  
  // Get test result
  const getTestResult = () => {
    return testResults.find(
      result => totalScore >= result.minScore && totalScore <= result.maxScore
    );
  };
  
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
              <div className="flex items-center mb-6">
                <div className={`text-4xl p-3 rounded-full ${specialty.color} text-white mr-4`}>
                  {specialty.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{specialty.title}</h2>
                  <p className="text-gray-500">{specialty.description}</p>
                </div>
              </div>
              
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
                {questions[currentQuestionIndex].options.map(option => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="w-full justify-start text-left py-4 border-2 hover:border-primary hover:bg-primary/5"
                    onClick={() => handleAnswer(questions[currentQuestionIndex].id, option.score)}
                  >
                    {option.text}
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
            <div className={`${specialty.color} p-6 text-white`}>
              <div className="flex items-center">
                <div className="text-5xl mr-4">{specialty.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold">{specialty.title}</h2>
                  <p className="opacity-80">{specialty.description}</p>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4">{getTestResult()?.title}</h3>
              <p className="text-lg mb-6">{getTestResult()?.description}</p>
              
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Ваш результат:</span>
                  <span className="font-bold">{totalScore} из 20 баллов</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full" 
                    style={{ width: `${(totalScore / 20) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-2"
                  onClick={onRestart}
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