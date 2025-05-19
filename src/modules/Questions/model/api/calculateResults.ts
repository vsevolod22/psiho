import { api } from '@/shared/api/axios-instance';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Интерфейс для результатов теста
export interface ITestResult {
  [key: string]: {
    name: string;
    score: number;
  }
}

// Интерфейс для запроса
interface ICalculateRequest {
  answers: number[];
}

// Функция для отправки ответов и получения результатов
const calculateResults = async (data: ICalculateRequest): Promise<ITestResult> => {
  const response = await api.post<ITestResult>('calculate/', data);
  return response.data;
};

// Хук для использования мутации
export const useCalculateResults = () => {
  return useMutation<ITestResult, AxiosError, ICalculateRequest>({
    mutationFn: calculateResults,
  });
};