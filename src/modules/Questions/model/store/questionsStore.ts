import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ITestResult } from '../api/calculateResults';

interface QuestionsState {
  // Состояние
  currentQuestionIndex: number;
  answers: number[];
  showResults: boolean;
  testResults: ITestResult | null;
  
  // Действия
  setCurrentQuestionIndex: (index: number) => void;
  addAnswer: (questionIndex: number, answerId: number) => void;
  resetAnswers: () => void;
  setTestResults: (results: ITestResult) => void;
  setShowResults: (show: boolean) => void;
}

export const useQuestionsStore = create<QuestionsState>()(
  persist(
    (set, get) => ({
      // Начальное состояние
      currentQuestionIndex: 0,
      answers: [],
      showResults: false,
      testResults: null,
      
      // Методы для изменения состояния
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      
      addAnswer: (questionIndex, answerId) => {
        const { answers } = get();
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerId;
        set({ answers: newAnswers });
      },
      
      resetAnswers: () => set({ 
        answers: [], 
        currentQuestionIndex: 0, 
        showResults: false,
        testResults: null 
      }),
      
      setTestResults: (results) => set({ testResults: results }),
      
      setShowResults: (show) => set({ showResults: show }),
    }),
    {
      name: 'questions-storage', // Имя для localStorage
      partialize: (state) => ({ 
        answers: state.answers,
        testResults: state.testResults
      }), // Сохраняем только ответы и результаты
    }
  )
);