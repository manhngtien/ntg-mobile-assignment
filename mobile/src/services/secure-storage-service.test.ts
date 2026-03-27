jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
  ACCESS_CONTROL: { BIOMETRY_ANY_OR_DEVICE_PASSCODE: 'biometryAnyOrDevicePasscode' },
  ACCESSIBLE: { WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'whenUnlockedThisDeviceOnly' },
}));

import { secureStorageService } from './secure-storage-service';
import * as Keychain from 'react-native-keychain';

const mockKeychain = Keychain as jest.Mocked<typeof Keychain>;

describe('secureStorageService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('saveToken', () => {
    it('should save token and return true', async () => {
      (mockKeychain.setGenericPassword as jest.Mock).mockResolvedValue(true);
      const result = await secureStorageService.saveToken('my-token');
      expect(result).toBe(true);
      expect(mockKeychain.setGenericPassword).toHaveBeenCalledWith('auth_token', 'my-token', expect.objectContaining({
        service: 'auth_token',
      }));
    });

    it('should return false on error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (mockKeychain.setGenericPassword as jest.Mock).mockRejectedValue(new Error('fail'));
      const result = await secureStorageService.saveToken('my-token');
      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith('Failed to save token to keychain:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('loadToken', () => {
    it('should return token when credentials exist', async () => {
      (mockKeychain.getGenericPassword as jest.Mock).mockResolvedValue({ username: 'auth_token', password: 'the-token' });
      const result = await secureStorageService.loadToken();
      expect(result).toBe('the-token');
    });

    it('should return null when no credentials', async () => {
      (mockKeychain.getGenericPassword as jest.Mock).mockResolvedValue(false);
      const result = await secureStorageService.loadToken();
      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (mockKeychain.getGenericPassword as jest.Mock).mockRejectedValue(new Error('fail'));
      const result = await secureStorageService.loadToken();
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Failed to load token from keychain:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('removeToken', () => {
    it('should remove token and return true', async () => {
      (mockKeychain.resetGenericPassword as jest.Mock).mockResolvedValue(true);
      const result = await secureStorageService.removeToken();
      expect(result).toBe(true);
    });

    it('should return false on error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (mockKeychain.resetGenericPassword as jest.Mock).mockRejectedValue(new Error('fail'));
      const result = await secureStorageService.removeToken();
      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith('Failed to remove token from keychain:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });
});
