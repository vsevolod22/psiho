import { api } from '@/shared/api/axios-instance';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Интерфейсы для вопросов и ответов
export interface IAnswer {
  text: string;
  id: number;
}

export interface IQuestion {
  text: string;
  answers: IAnswer[];
}

// Функция для получения списка вопросов
const fetchQuestions = async (): Promise<IQuestion[]> => {
  const response = await api.get<IQuestion[]>('questions/');
  return response.data;
};

// Хук для использования запроса вопросов
export const useFetchQuestions = () => {
  return useQuery<IQuestion[], AxiosError>({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  });
};