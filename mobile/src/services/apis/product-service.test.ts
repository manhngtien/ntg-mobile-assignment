import axios from 'axios';

jest.mock('axios');
jest.mock('react-native-config', () => ({
  API_BASE_URL: 'http://localhost:3000',
}));

import { secureStorageService } from '../secure-storage-service';
import { productService } from './product-service';

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('productService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should call getProducts with category', async () => {
    jest.spyOn(secureStorageService, 'loadToken').mockResolvedValue('my-token');
    const mockResponse = { data: { status: true, data: [{ id: 1, name: 'Product' }] } };
    mockAxios.get.mockResolvedValue(mockResponse);
    const result = await productService.getProducts('Electronics');
    expect(mockAxios.get).toHaveBeenCalledWith(
      'http://localhost:3000/product/?category=Electronics',
      { headers: { Authorization: 'Bearer my-token' } },
    );
    expect(result).toEqual(mockResponse.data);
  });

  it('should call getProducts without category query param when empty', async () => {
    jest.spyOn(secureStorageService, 'loadToken').mockResolvedValue('my-token');
    const mockResponse = { data: { status: true, data: [] } };
    mockAxios.get.mockResolvedValue(mockResponse);
    await productService.getProducts('');
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/product/', {
      headers: { Authorization: 'Bearer my-token' },
    });
  });

  it('should call getProducts with special characters in category', async () => {
    jest.spyOn(secureStorageService, 'loadToken').mockResolvedValue('my-token');
    const mockResponse = { data: { status: true, data: [] } };
    mockAxios.get.mockResolvedValue(mockResponse);
    await productService.getProducts('Food & Beverage');
    expect(mockAxios.get).toHaveBeenCalledWith(
      'http://localhost:3000/product/?category=Food%20%26%20Beverage',
      { headers: { Authorization: 'Bearer my-token' } },
    );
  });

  it('should call getProductById with valid id', async () => {
    jest.spyOn(secureStorageService, 'loadToken').mockResolvedValue('my-token');
    const mockProduct = {
      id: 1,
      name: 'Product',
      description: 'Desc',
      image: 'img.jpg',
      price: 10,
      priceUnit: 'USD',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      category: 'Electronics',
    };
    const mockResponse = { data: mockProduct };
    mockAxios.get.mockResolvedValue(mockResponse);
    const result = await productService.getProductById(1);
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/product/1', {
      headers: { Authorization: 'Bearer my-token' },
    });
    expect(result).toEqual(mockProduct);
  });

  it('should call getProductById with correct authorization header', async () => {
    jest.spyOn(secureStorageService, 'loadToken').mockResolvedValue('my-token');
    const mockProduct = {
      id: 5,
      name: 'Another',
      description: '',
      image: '',
      price: 20,
      priceUnit: 'USD',
      createdAt: '',
      updatedAt: '',
      category: '',
    };
    const mockResponse = { data: mockProduct };
    mockAxios.get.mockResolvedValue(mockResponse);
    await productService.getProductById(5);
    expect(secureStorageService.loadToken).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/product/5', {
      headers: { Authorization: 'Bearer my-token' },
    });
  });
});
