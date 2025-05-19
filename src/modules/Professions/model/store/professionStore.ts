import { create } from 'zustand';
import { IProfession } from '../api/getPorfessions';

interface ProfessionState {
  selectedProfession: IProfession | null;
  setSelectedProfession: (profession: IProfession | null) => void;
  resetSelectedProfession: () => void;
}

export const useProfessionStore = create<ProfessionState>((set) => ({
  selectedProfession: null,
  setSelectedProfession: (profession) => set({ selectedProfession: profession }),
  resetSelectedProfession: () => set({ selectedProfession: null }),
}));