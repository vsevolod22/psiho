// Types for specialties and questions
export interface Specialty {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Question {
  id: number;
  text: string;
  options: {
    id: number;
    text: string;
    score: number;
  }[];
}

export interface TestResult {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
}

// Data about specialties
export const specialties: Specialty[] = [
  {
    id: 1,
    title: 'Творческие способности',
    description: 'Оценка творческого потенциала и креативного мышления',
    icon: '🎨',
    color: 'bg-pink-500',
  },
  {
    id: 2,
    title: 'Технические навыки',
    description: 'Определение склонности к техническим и инженерным наукам',
    icon: '⚙️',
    color: 'bg-blue-500',
  },
  {
    id: 3,
    title: 'Социальные способности',
    description: 'Оценка коммуникативных навыков и эмпатии',
    icon: '👥',
    color: 'bg-green-500',
  },
  {
    id: 4,
    title: 'Аналитическое мышление',
    description: 'Определение способностей к логическому и аналитическому мышлению',
    icon: '🧠',
    color: 'bg-purple-500',
  },
  {
    id: 5,
    title: 'Лидерские качества',
    description: 'Оценка организаторских способностей и лидерского потенциала',
    icon: '👑',
    color: 'bg-yellow-500',
  },
  {
    id: 6,
    title: 'Языковые способности',
    description: 'Определение склонности к изучению языков и лингвистике',
    icon: '🗣️',
    color: 'bg-red-500',
  },
  {
    id: 7,
    title: 'Музыкальные таланты',
    description: 'Оценка музыкального слуха и чувства ритма',
    icon: '🎵',
    color: 'bg-indigo-500',
  },
  {
    id: 8,
    title: 'Спортивные способности',
    description: 'Определение физических данных и координации',
    icon: '⚽',
    color: 'bg-orange-500',
  },
];

// Test questions
export const getQuestions = (specialtyId: number): Question[] => {
  // In a real application, there would be different questions for different specialties
  return [
    {
      id: 1,
      text: 'Насколько вам нравится решать сложные задачи в этой области?',
      options: [
        { id: 1, text: 'Совсем не нравится', score: 0 },
        { id: 2, text: 'Скорее не нравится', score: 1 },
        { id: 3, text: 'Нейтрально', score: 2 },
        { id: 4, text: 'Скорее нравится', score: 3 },
        { id: 5, text: 'Очень нравится', score: 4 },
      ],
    },
    {
      id: 2,
      text: 'Как часто вы занимаетесь деятельностью, связанной с этой областью?',
      options: [
        { id: 1, text: 'Никогда', score: 0 },
        { id: 2, text: 'Очень редко', score: 1 },
        { id: 3, text: 'Иногда', score: 2 },
        { id: 4, text: 'Часто', score: 3 },
        { id: 5, text: 'Постоянно', score: 4 },
      ],
    },
    {
      id: 3,
      text: 'Насколько легко вам даются задания в этой сфере?',
      options: [
        { id: 1, text: 'Очень сложно', score: 0 },
        { id: 2, text: 'Скорее сложно', score: 1 },
        { id: 3, text: 'Средне', score: 2 },
        { id: 4, text: 'Скорее легко', score: 3 },
        { id: 5, text: 'Очень легко', score: 4 },
      ],
    },
    {
      id: 4,
      text: 'Получаете ли вы удовольствие от деятельности в этой области?',
      options: [
        { id: 1, text: 'Совсем нет', score: 0 },
        { id: 2, text: 'Скорее нет', score: 1 },
        { id: 3, text: 'Нейтрально', score: 2 },
        { id: 4, text: 'Скорее да', score: 3 },
        { id: 5, text: 'Определенно да', score: 4 },
      ],
    },
    {
      id: 5,
      text: 'Хотели бы вы развиваться в этом направлении в будущем?',
      options: [
        { id: 1, text: 'Точно нет', score: 0 },
        { id: 2, text: 'Скорее нет', score: 1 },
        { id: 3, text: 'Возможно', score: 2 },
        { id: 4, text: 'Скорее да', score: 3 },
        { id: 5, text: 'Определенно да', score: 4 },
      ],
    },
  ];
};

// Test results
export const testResults: TestResult[] = [
  {
    minScore: 0,
    maxScore: 5,
    title: 'Низкий потенциал',
    description: 'В данной области у вас пока не выявлено значительных способностей. Возможно, ваши таланты лежат в другой сфере.',
  },
  {
    minScore: 6,
    maxScore: 10,
    title: 'Средний потенциал',
    description: 'У вас есть определенные задатки в этой области. При желании вы можете развить эти навыки с помощью регулярных занятий.',
  },
  {
    minScore: 11,
    maxScore: 15,
    title: 'Высокий потенциал',
    description: 'Вы демонстрируете хорошие способности в этой области. Рекомендуем обратить внимание на развитие этих талантов.',
  },
  {
    minScore: 16,
    maxScore: 20,
    title: 'Выдающийся потенциал',
    description: 'У вас выявлены выдающиеся способности в данной области! Рекомендуем серьезно заняться развитием этого таланта.',
  },
];