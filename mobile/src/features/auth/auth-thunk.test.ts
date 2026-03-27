import { loginUser, logoutUser, initializeAuth } from './auth-thunk';
import { authService } from '../../services/apis/auth-service';
import { secureStorageService } from '../../services/secure-storage-service';
import { databaseService } from '../../services/database-service';

jest.mock('../../services/apis/auth-service', () => ({
  authService: {
    login: jest.fn(),
    getUser: jest.fn(),
  },
}));

jest.mock('../../services/secure-storage-service', () => ({
  secureStorageService: {
    saveToken: jest.fn(),
    removeToken: jest.fn(),
  },
}));

jest.mock('../../services/database-service', () => ({
  databaseService: {
    saveUser: jest.fn(),
    deleteUser: jest.fn(),
  },
}));

const mockAuthService = authService as jest.Mocked<typeof authService>;
const mockSecureStorage = secureStorageService as jest.Mocked<typeof secureStorageService>;
const mockDatabaseService = databaseService as jest.Mocked<typeof databaseService>;

const mockUser = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  age: 25,
  role: 'user',
  firstName: 'Test',
  lastName: 'User',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

describe('authThunk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser', () => {
    const credentials = { username: 'testuser', password: 'password123' };

    it('should save token and user on successful login', async () => {
      const loginResponse = { status: true, data: { user: mockUser, token: 'test-token' } };
      mockAuthService.login.mockResolvedValue(loginResponse);

      const dispatch = jest.fn();
      const thunk = loginUser(credentials);
      const result = await thunk(dispatch, () => { }, undefined);

      expect(mockAuthService.login).toHaveBeenCalledWith(credentials);
      expect(mockSecureStorage.saveToken).toHaveBeenCalledWith('test-token');
      expect(mockDatabaseService.saveUser).toHaveBeenCalledWith(mockUser);
      expect(result.payload).toEqual(loginResponse.data);
      expect(result.type).toBe('auth/loginUser/fulfilled');
    });

    it('should not save token when token is missing', async () => {
      const loginResponse = { status: true, data: { user: mockUser, token: '' } };
      mockAuthService.login.mockResolvedValue(loginResponse);

      const dispatch = jest.fn();
      const thunk = loginUser(credentials);
      await thunk(dispatch, () => { }, undefined);

      expect(mockSecureStorage.saveToken).not.toHaveBeenCalled();
      expect(mockDatabaseService.saveUser).toHaveBeenCalledWith(mockUser);
    });

    it('should not save user when user is missing', async () => {
      const loginResponse = { status: true, data: { user: null as any, token: 'test-token' } };
      mockAuthService.login.mockResolvedValue(loginResponse);

      const dispatch = jest.fn();
      const thunk = loginUser(credentials);
      await thunk(dispatch, () => { }, undefined);

      expect(mockSecureStorage.saveToken).toHaveBeenCalledWith('test-token');
      expect(mockDatabaseService.saveUser).not.toHaveBeenCalled();
    });

    it('should reject with error message on failure', async () => {
      mockAuthService.login.mockRejectedValue(new Error('Network error'));

      const dispatch = jest.fn();
      const thunk = loginUser(credentials);
      const result = await thunk(dispatch, () => { }, undefined);

      expect(result.type).toBe('auth/loginUser/rejected');
      expect(result.payload).toBe('Login failed. Please try again.');
      expect(mockSecureStorage.saveToken).not.toHaveBeenCalled();
      expect(mockDatabaseService.saveUser).not.toHaveBeenCalled();
    });
  });

  describe('logoutUser', () => {
    it('should remove token and delete user on logout', async () => {
      const dispatch = jest.fn();
      const thunk = logoutUser();
      const result = await thunk(dispatch, () => { }, undefined);

      expect(mockSecureStorage.removeToken).toHaveBeenCalled();
      expect(mockDatabaseService.deleteUser).toHaveBeenCalled();
      expect(result.type).toBe('auth/logoutUser/fulfilled');
    });

    it('should reject when removeToken fails', async () => {
      mockSecureStorage.removeToken.mockRejectedValue(new Error('Keychain error'));

      const dispatch = jest.fn();
      const thunk = logoutUser();
      const result = await thunk(dispatch, () => { }, undefined);

      expect(result.type).toBe('auth/logoutUser/rejected');
    });
  });

  describe('initializeAuth', () => {
    it('should return user and save to database on success', async () => {
      mockAuthService.getUser.mockResolvedValue({ status: true, data: mockUser });

      const dispatch = jest.fn();
      const thunk = initializeAuth();
      const result = await thunk(dispatch, () => { }, undefined);

      expect(mockAuthService.getUser).toHaveBeenCalled();
      expect(mockDatabaseService.saveUser).toHaveBeenCalledWith(mockUser);
      expect(result.payload).toEqual(mockUser);
      expect(result.type).toBe('auth/initializeAuth/fulfilled');
    });

    it('should return null when user data is empty', async () => {
      mockAuthService.getUser.mockResolvedValue({ status: true, data: null as any });

      const dispatch = jest.fn();
      const thunk = initializeAuth();
      const result = await thunk(dispatch, () => { }, undefined);

      expect(mockDatabaseService.saveUser).not.toHaveBeenCalled();
      expect(result.payload).toBeNull();
      expect(result.type).toBe('auth/initializeAuth/fulfilled');
    });

    it('should remove token and return null on failure', async () => {
      mockAuthService.getUser.mockRejectedValue(new Error('Unauthorized'));
      mockSecureStorage.removeToken.mockResolvedValue(true);

      const dispatch = jest.fn();
      const thunk = initializeAuth();
      const result = await thunk(dispatch, () => { }, undefined);

      expect(mockSecureStorage.removeToken).toHaveBeenCalled();
      expect(result.type).toBe('auth/initializeAuth/fulfilled');
      expect(result.payload).toBeNull();
    });
  });
});
