export interface Resume {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  description: string;
  achievements: string[];
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  date?: string;
  description?: string;
  issuer?: string;
}
