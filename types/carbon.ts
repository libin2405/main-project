export interface Product {
  id: string;
  name: string;
  brand: string;
  barcode: string;
  category: string;
  image: string;
  carbonFootprint: CarbonFootprint;
  alternatives?: Alternative[];
  certifications: string[];
}

export interface CarbonFootprint {
  total: number; // kg CO2 equivalent
  manufacturing: number;
  transportation: number;
  packaging: number;
  usage: number;
  disposal: number;
  rating: 'A' | 'B' | 'C' | 'D' | 'E'; // A is best, E is worst
}

export interface Alternative {
  id: string;
  name: string;
  brand: string;
  carbonFootprint: CarbonFootprint;
  image: string;
  price: number;
  availability: string;
}

export interface UserStats {
  totalScans: number;
  carbonSaved: number; // kg CO2
  treesEquivalent: number;
  monthlyGoal: number;
  currentStreak: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'scanning' | 'savings' | 'education' | 'community';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: string;
  expiresAt: Date;
  type: 'weekly' | 'monthly';
}