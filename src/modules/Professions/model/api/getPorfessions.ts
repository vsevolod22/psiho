import { api } from '@/shared/api/axios-instance';
import { useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';

// Интерфейс для профессии
export interface IProfession {
  id: number;
  name: string;
  description: string;
  img: string;
}

// Функция для получения списка профессий
const fetchProfessions = async (): Promise<IProfession[]> => {
  const response = await api.get<IProfession[]>('professions/');
  return response.data;
};

// Хук для использования запроса
export const useFetchProfessions = () => {
  return useQuery<IProfession[], AxiosError>({
    queryKey: ['professions'],
    queryFn: fetchProfessions,
  });
};