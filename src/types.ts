export interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
  iconName: string;
  benefits: string[];
  imageUrl: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  service: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceNeeded: string;
  message: string;
  date: string;
}

export interface ProjectPhoto {
  id: string;
  url: string;
  category: string;
  title: string;
  description: string;
}
