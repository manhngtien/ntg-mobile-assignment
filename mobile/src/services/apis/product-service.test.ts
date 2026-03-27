import axios from 'axios';

jest.mock('axios');
jest.mock('react-native-config', () => ({
  API_BASE_URL: 'http://localhost:3000',
}));

import { productService } from './product-service';
import { secureStorageService } from '../secure-storage-service';

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('productService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should call getProducts with category', async () => {
    jest.spyOn(secureStorageService, 'loadToken').mockResolvedValue('my-token');
    const mockResponse = { data: { status: true, data: [{ id: 1, name: 'Product' }] } };
    mockAxios.get.mockResolvedValue(mockResponse);
    const result = await productService.getProducts('Electronics');
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/product/?category=Electronics', { headers: { Authorization: 'Bearer my-token' } });
    expect(result).toEqual(mockResponse.data);
  });

  it('should call getProducts without category query param when empty', async () => {
    jest.spyOn(secureStorageService, 'loadToken').mockResolvedValue('my-token');
    const mockResponse = { data: { status: true, data: [] } };
    mockAxios.get.mockResolvedValue(mockResponse);
    await productService.getProducts('');
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/product/', { headers: { Authorization: 'Bearer my-token' } });
  });

  it('should call getProducts with special characters in category', async () => {
    jest.spyOn(secureStorageService, 'loadToken').mockResolvedValue('my-token');
    const mockResponse = { data: { status: true, data: [] } };
    mockAxios.get.mockResolvedValue(mockResponse);
    await productService.getProducts('Food & Beverage');
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/product/?category=Food%20%26%20Beverage', { headers: { Authorization: 'Bearer my-token' } });
  });
});
