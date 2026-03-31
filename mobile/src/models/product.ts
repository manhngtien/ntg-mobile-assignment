export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  priceUnit: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description:
      'High-quality wireless headphones with noise cancellation and 30-hour battery life',
    image: 'https://example.com/images/headphones.jpg',
    price: 199.99,
    priceUnit: 'USD',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Organic Coffee Beans',
    description: 'Premium organic coffee beans from Colombia, roasted to perfection',
    image: 'https://example.com/images/coffee.jpg',
    price: 24.99,
    priceUnit: 'USD',
    createdAt: '2024-02-20T14:30:00Z',
    updatedAt: '2024-02-20T14:30:00Z',
    category: 'Food & Beverage',
  },
  {
    id: 3,
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with heart rate monitor, GPS, and 7-day battery',
    image: 'https://example.com/images/smartwatch.jpg',
    price: 299.99,
    priceUnit: 'USD',
    createdAt: '2024-03-10T09:15:00Z',
    updatedAt: '2024-03-10T09:15:00Z',
    category: 'Electronics',
  },
];
