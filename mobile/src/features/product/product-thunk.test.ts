import { fetchProducts, fetchProductById } from './product-thunk';
import { productService } from '../../services/apis/product-service';

jest.mock('../../services/apis/product-service', () => ({
  productService: {
    getProducts: jest.fn(),
    getProductById: jest.fn(),
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

    it('should return empty array when response data is empty', async () => {
      const mockResponse = { status: true, data: [] };
      mockProductService.getProducts.mockResolvedValue(mockResponse);

      const dispatch = jest.fn();
      const thunk = fetchProducts({ category: 'NonExistent' });
      const result = await thunk(dispatch, () => { }, undefined);

      expect(result.payload).toEqual([]);
      expect(result.type).toBe('product/fetchProducts/fulfilled');
    });

    it('should reject with error message when non-Error is thrown', async () => {
      mockProductService.getProducts.mockRejectedValue('string error');

      const dispatch = jest.fn();
      const thunk = fetchProducts({ category: 'Electronics' });
      const result = await thunk(dispatch, () => { }, undefined);

      expect(result.type).toBe('product/fetchProducts/rejected');
      expect(result.payload).toBe('Failed to fetch products. Please try again.');
    });

    it('should dispatch pending and fulfilled actions', async () => {
      const mockResponse = { status: true, data: mockProducts };
      mockProductService.getProducts.mockResolvedValue(mockResponse);

      const dispatch = jest.fn();
      const thunk = fetchProducts({ category: 'Electronics' });
      await thunk(dispatch, () => { }, undefined);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0].type).toBe('product/fetchProducts/pending');
      expect(dispatch.mock.calls[1][0].type).toBe('product/fetchProducts/fulfilled');
    });

    it('should dispatch pending and rejected actions on failure', async () => {
      mockProductService.getProducts.mockRejectedValue(new Error('Network error'));

      const dispatch = jest.fn();
      const thunk = fetchProducts({ category: 'Electronics' });
      await thunk(dispatch, () => { }, undefined);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0].type).toBe('product/fetchProducts/pending');
      expect(dispatch.mock.calls[1][0].type).toBe('product/fetchProducts/rejected');
    });

    it('should handle category with special characters', async () => {
      const mockResponse = { status: true, data: mockProducts };
      mockProductService.getProducts.mockResolvedValue(mockResponse);

      const dispatch = jest.fn();
      const thunk = fetchProducts({ category: 'Food & Beverage' });
      const result = await thunk(dispatch, () => { }, undefined);

      expect(mockProductService.getProducts).toHaveBeenCalledWith('Food & Beverage');
      expect(result.payload).toEqual(mockProducts);
      expect(result.type).toBe('product/fetchProducts/fulfilled');
    });
  });

  describe('fetchProductById', () => {
    it('should return product on success', async () => {
      mockProductService.getProductById.mockResolvedValue({ status: true, data: mockProducts[0] });

      const dispatch = jest.fn();
      const thunk = fetchProductById(1);
      const result = await thunk(dispatch, () => { }, undefined);

      expect(mockProductService.getProductById).toHaveBeenCalledWith(1);
      expect(result.payload).toEqual(mockProducts[0]);
      expect(result.type).toBe('product/fetchProductById/fulfilled');
    });

    it('should call getProductById with correct id', async () => {
      mockProductService.getProductById.mockResolvedValue({ status: true, data: mockProducts[1] });

      const dispatch = jest.fn();
      const thunk = fetchProductById(2);
      await thunk(dispatch, () => { }, undefined);

      expect(mockProductService.getProductById).toHaveBeenCalledWith(2);
    });

    it('should reject with error message on failure', async () => {
      mockProductService.getProductById.mockRejectedValue(new Error('Network error'));

      const dispatch = jest.fn();
      const thunk = fetchProductById(1);
      const result = await thunk(dispatch, () => { }, undefined);

      expect(result.type).toBe('product/fetchProductById/rejected');
      expect(result.payload).toBe('Failed to fetch product. Please try again.');
    });

    it('should return null when response data is undefined', async () => {
      mockProductService.getProductById.mockResolvedValue({ status: true, data: undefined });

      const dispatch = jest.fn();
      const thunk = fetchProductById(999);
      const result = await thunk(dispatch, () => { }, undefined);

      expect(result.payload).toBeNull();
      expect(result.type).toBe('product/fetchProductById/fulfilled');
    });

    it('should reject with error message when non-Error is thrown', async () => {
      mockProductService.getProductById.mockRejectedValue('string error');

      const dispatch = jest.fn();
      const thunk = fetchProductById(1);
      const result = await thunk(dispatch, () => { }, undefined);

      expect(result.type).toBe('product/fetchProductById/rejected');
      expect(result.payload).toBe('Failed to fetch product. Please try again.');
    });

    it('should dispatch pending and fulfilled actions', async () => {
      mockProductService.getProductById.mockResolvedValue({ status: true, data: mockProducts[0] });

      const dispatch = jest.fn();
      const thunk = fetchProductById(1);
      await thunk(dispatch, () => { }, undefined);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0].type).toBe('product/fetchProductById/pending');
      expect(dispatch.mock.calls[1][0].type).toBe('product/fetchProductById/fulfilled');
    });

    it('should dispatch pending and rejected actions on failure', async () => {
      mockProductService.getProductById.mockRejectedValue(new Error('Network error'));

      const dispatch = jest.fn();
      const thunk = fetchProductById(1);
      await thunk(dispatch, () => { }, undefined);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0].type).toBe('product/fetchProductById/pending');
      expect(dispatch.mock.calls[1][0].type).toBe('product/fetchProductById/rejected');
    });

    it('should handle id of 0', async () => {
      const productWithZeroId = { ...mockProducts[0], id: 0 };
      mockProductService.getProductById.mockResolvedValue({ status: true, data: productWithZeroId });

      const dispatch = jest.fn();
      const thunk = fetchProductById(0);
      const result = await thunk(dispatch, () => { }, undefined);

      expect(mockProductService.getProductById).toHaveBeenCalledWith(0);
      expect(result.payload).toEqual(productWithZeroId);
      expect(result.type).toBe('product/fetchProductById/fulfilled');
    });
  });
});
