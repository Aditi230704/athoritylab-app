export interface User {
  name: string;
  email: string;
  phone?: string;
  returning?: boolean;
}

export type Page = 'home' | 'about' | 'services' | 'community' | 'tools' | 'pro' | 'auth';
