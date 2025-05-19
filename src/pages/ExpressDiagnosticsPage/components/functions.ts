import { IProfession } from "@/modules/Professions/model/api/getPorfessions";

// Адаптер для преобразования IProfession в Specialty
export const adaptProfessionToSpecialty = (profession: IProfession) => {
    // Получение цвета и иконки на основе ID
    const getColor = (id: number) => {
      const colors = [
        'bg-pink-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
        'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-orange-500'
      ];
      return colors[(id - 1) % colors.length];
    };
    
    const getIcon = (id: number) => {
      const icons = ['🎨', '🎵', '👑', '⚙️', '👥', '🗣️', '🧠', '⚽'];
      return icons[(id - 1) % icons.length];
    };
    
    return {
      id: profession.id,
      title: profession.name,
      description: profession.description,
      icon: getIcon(profession.id),
      color: getColor(profession.id)
    };
  };
  