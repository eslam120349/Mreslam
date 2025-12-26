
export type UserRole = 'student' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  grade?: string;
  role: UserRole;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  grade: string;
  thumbnail: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  grade: string;
}

export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  grade: string;
}

export interface Achievement {
  id: string;
  label: string;
  value: string;
  icon: string;
}
