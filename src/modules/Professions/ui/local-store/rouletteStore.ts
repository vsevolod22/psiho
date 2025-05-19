import { create } from 'zustand';
import { IProfession } from '../../model/api/getPorfessions';

interface RouletteState {
  // Состояния рулетки
  isSpinning: boolean;
  itemsToShow: IProfession[];
  scrollPosition: number;
  finalItemIndex: number;
  showHighlight: boolean;
  visibleProfessionIndex: number;
  centerProfession: IProfession | null;
  
  // Методы для управления состоянием
  setIsSpinning: (value: boolean) => void;
  setItemsToShow: (items: IProfession[]) => void;
  setScrollPosition: (position: number) => void;
  setFinalItemIndex: (index: number) => void;
  setShowHighlight: (value: boolean) => void;
  setVisibleProfessionIndex: (index: number) => void;
  setCenterProfession: (profession: IProfession | null) => void;
  
  // Сброс состояния
  resetState: () => void;
}

export const useRouletteStore = create<RouletteState>((set) => ({
  // Начальные значения
  isSpinning: false,
  itemsToShow: [],
  scrollPosition: 0,
  finalItemIndex: 0,
  showHighlight: false,
  visibleProfessionIndex: 0,
  centerProfession: null,
  
  // Методы для изменения состояния
  setIsSpinning: (value) => set({ isSpinning: value }),
  setItemsToShow: (items) => set({ itemsToShow: items }),
  setScrollPosition: (position) => set({ scrollPosition: position }),
  setFinalItemIndex: (index) => set({ finalItemIndex: index }),
  setShowHighlight: (value) => set({ showHighlight: value }),
  setVisibleProfessionIndex: (index) => set({ visibleProfessionIndex: index }),
  setCenterProfession: (profession) => set({ centerProfession: profession }),
  
  // Сброс состояния к начальным значениям
  resetState: () => set({
    isSpinning: false,
    itemsToShow: [],
    scrollPosition: 0,
    finalItemIndex: 0,
    showHighlight: false,
    visibleProfessionIndex: 0,
    centerProfession: null,
  }),
}));