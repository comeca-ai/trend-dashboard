export interface Trends {
  id: string;
  title: string;
  description: string;
  search_volume: number;
  growth_rate: number;
  country: string;
  category: string;
  related_queries: string[];
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
}

export interface DashboardStats {
  total_trends: number;
  trending_now: number;
  avg_growth_rate: number;
  countries_monitored: number;
}
