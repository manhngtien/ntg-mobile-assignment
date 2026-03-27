import axios from 'axios';

jest.mock('axios');
jest.mock('react-native-config', () => ({
  API_BASE_URL: 'http://localhost:3000',
}));

import { authService } from './auth-service';
import { secureStorageService } from '../secure-storage-service';

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('authService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should call login endpoint with credentials', async () => {
    const mockResponse = { data: { status: true, data: { user: { id: 1 }, token: 'abc' } } };
    mockAxios.post.mockResolvedValue(mockResponse);
    const result = await authService.login({ username: 'test', password: '123' });
    expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:3000/login', { username: 'test', password: '123' });
    expect(result).toEqual(mockResponse.data);
  });

  it('should call getUser endpoint with token', async () => {
    jest.spyOn(secureStorageService, 'loadToken').mockResolvedValue('my-token');
    const mockResponse = { data: { status: true, data: { id: 1, username: 'test' } } };
    mockAxios.get.mockResolvedValue(mockResponse);
    const result = await authService.getUser();
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/user', { headers: { Authorization: 'Bearer my-token' } });
    expect(result).toEqual(mockResponse.data);
  });
});
