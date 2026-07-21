export interface Lecture {
  id: number;
  title: string;
  instructor: string;
  date: string;
  image: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  students: number;
  rating: number;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface FilterOptions {
  level: string[];
  duration: string[];
  rating: number | null;
  dateRange: {
    from: string;
    to: string;
  };
}