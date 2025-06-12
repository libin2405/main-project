import { Product, UserStats, Achievement, Challenge } from '@/types/carbon';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Coconut Water',
    brand: 'Pure Nature',
    barcode: '123456789012',
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/1346506/pexels-photo-1346506.jpeg?auto=compress&cs=tinysrgb&w=400',
    carbonFootprint: {
      total: 0.8,
      manufacturing: 0.3,
      transportation: 0.2,
      packaging: 0.2,
      usage: 0.0,
      disposal: 0.1,
      rating: 'A'
    },
    alternatives: [
      {
        id: 'alt1',
        name: 'Tap Water',
        brand: 'Local',
        carbonFootprint: {
          total: 0.0003,
          manufacturing: 0,
          transportation: 0,
          packaging: 0,
          usage: 0.0003,
          disposal: 0,
          rating: 'A'
        },
        image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 0.001,
        availability: 'Always available'
      }
    ],
    certifications: ['Organic', 'Fair Trade', 'Carbon Neutral']
  },
  {
    id: '2',
    name: 'Plastic Water Bottle',
    brand: 'AquaFlow',
    barcode: '987654321098',
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=400',
    carbonFootprint: {
      total: 3.2,
      manufacturing: 1.8,
      transportation: 0.6,
      packaging: 0.4,
      usage: 0.0,
      disposal: 0.4,
      rating: 'D'
    },
    alternatives: [
      {
        id: 'alt2',
        name: 'Reusable Steel Bottle',
        brand: 'EcoVessel',
        carbonFootprint: {
          total: 0.05, // Amortized over 1000 uses
          manufacturing: 15,
          transportation: 2,
          packaging: 1,
          usage: 0,
          disposal: 0.5,
          rating: 'A'
        },
        image: 'https://images.pexels.com/photos/7262751/pexels-photo-7262751.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 25.99,
        availability: 'In stock'
      }
    ],
    certifications: []
  },
  {
    id: '3',
    name: 'Organic Quinoa',
    brand: 'Earth Harvest',
    barcode: '456789012345',
    category: 'Grains',
    image: 'https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=400',
    carbonFootprint: {
      total: 1.2,
      manufacturing: 0.6,
      transportation: 0.3,
      packaging: 0.2,
      usage: 0.0,
      disposal: 0.1,
      rating: 'B'
    },
    alternatives: [],
    certifications: ['Organic', 'Non-GMO', 'Rainforest Alliance']
  }
];

export const mockUserStats: UserStats = {
  totalScans: 127,
  carbonSaved: 45.6,
  treesEquivalent: 2.1,
  monthlyGoal: 50,
  currentStreak: 12,
  achievements: [
    {
      id: 'ach1',
      title: 'First Scan',
      description: 'Completed your first product scan',
      icon: 'scan',
      unlockedAt: new Date('2024-01-15'),
      category: 'scanning'
    },
    {
      id: 'ach2',
      title: 'Eco Warrior',
      description: 'Saved 10kg of CO2 this month',
      icon: 'leaf',
      unlockedAt: new Date('2024-01-20'),
      category: 'savings'
    },
    {
      id: 'ach3',
      title: 'Knowledge Seeker',
      description: 'Completed 5 educational modules',
      icon: 'book',
      unlockedAt: new Date('2024-01-25'),
      category: 'education'
    }
  ]
};

export const mockChallenges: Challenge[] = [
  {
    id: 'ch1',
    title: 'Sustainable Shopping',
    description: 'Choose eco-friendly alternatives for 10 products',
    target: 10,
    current: 6,
    reward: '100 EcoPoints + Tree Badge',
    expiresAt: new Date('2024-02-15'),
    type: 'weekly'
  },
  {
    id: 'ch2',
    title: 'Carbon Saver',
    description: 'Reduce your carbon footprint by 20kg this month',
    target: 20,
    current: 12.5,
    reward: 'Carbon Hero Badge',
    expiresAt: new Date('2024-02-29'),
    type: 'monthly'
  }
];

export const educationalTips = [
  {
    id: 'tip1',
    title: 'Choose Local Products',
    description: 'Products made locally have lower transportation emissions.',
    category: 'transportation',
    impact: 'High'
  },
  {
    id: 'tip2',
    title: 'Minimal Packaging',
    description: 'Look for products with minimal or recyclable packaging.',
    category: 'packaging',
    impact: 'Medium'
  },
  {
    id: 'tip3',
    title: 'Organic vs Conventional',
    description: 'Organic farming often has lower carbon footprint than conventional methods.',
    category: 'manufacturing',
    impact: 'Medium'
  }
];