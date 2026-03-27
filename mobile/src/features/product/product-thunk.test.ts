import { fetchProducts } from './product-thunk';
import { productService } from '../../services/apis/product-service';

jest.mock('../../services/apis/product-service', () => ({
  productService: {
    getProducts: jest.fn(),
  },
}));

const mockProductService = productService as jest.Mocked<typeof productService>;

const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones',
    image: 'https://example.com/headphones.jpg',
    price: 199.99,
    priceUnit: 'USD',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Organic Coffee Beans',
    description: 'Premium organic coffee beans',
    image: 'https://example.com/coffee.jpg',
    price: 24.99,
    priceUnit: 'USD',
    createdAt: '2024-02-20T14:30:00Z',
    updatedAt: '2024-02-20T14:30:00Z',
    category: 'Food & Beverage',
  },
];

describe('productThunk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchProducts', () => {
    it('should return products on success', async () => {
      const mockResponse = { status: true, data: mockProducts };
      mockProductService.getProducts.mockResolvedValue(mockResponse);

      const dispatch = jest.fn();
      const thunk = fetchProducts({ category: 'Electronics' });
      const result = await thunk(dispatch, () => { }, undefined);

      expect(mockProductService.getProducts).toHaveBeenCalledWith('Electronics');
      expect(result.payload).toEqual(mockProducts);
      expect(result.type).toBe('product/fetchProducts/fulfilled');
    });

    it('should call getProducts with empty category', async () => {
      const mockResponse = { status: true, data: mockProducts };
      mockProductService.getProducts.mockResolvedValue(mockResponse);

      const dispatch = jest.fn();
      const thunk = fetchProducts({ category: '' });
      await thunk(dispatch, () => { }, undefined);

      expect(mockProductService.getProducts).toHaveBeenCalledWith('');
    });

    it('should reject with error message on failure', async () => {
      mockProductService.getProducts.mockRejectedValue(new Error('Network error'));

      const dispatch = jest.fn();
      const thunk = fetchProducts({ category: 'Electronics' });
      const result = await thunk(dispatch, () => { }, undefined);

      expect(result.type).toBe('product/fetchProducts/rejected');
      expect(result.payload).toBe('Failed to fetch products. Please try again.');
    });
  });
});
