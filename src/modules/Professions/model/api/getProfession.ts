import { useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { IProfession } from './getPorfessions';
import { api } from '@/shared/api/axios-instance';

// Функция для получения профессии по ID
const fetchProfession = async (id: number): Promise<IProfession> => {
  const response = await api.get<IProfession>(`professions/${id}/`);
  return response.data;
};

// Хук для использования запроса
export const useFetchProfession = (id: number) => {
  return useQuery<IProfession, AxiosError>({
    queryKey: ['profession', id],
    queryFn: () => fetchProfession(id),
    enabled: !!id, // Запрос выполняется только если id существует
  });
};