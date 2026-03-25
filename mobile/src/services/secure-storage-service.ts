import * as Keychain from 'react-native-keychain';

const TOKEN_KEY = 'auth_token';

export const secureStorageService = {
  async saveToken(token: string): Promise<boolean> {
    try {
      await Keychain.setGenericPassword(TOKEN_KEY, token, {
        service: TOKEN_KEY,
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      return true;
    } catch (error) {
      console.error('Failed to save token to keychain:', error);
      return false;
    }
  },

  async loadToken(): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: TOKEN_KEY,
      });
      if (credentials) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Failed to load token from keychain:', error);
      return null;
    }
  },

  async removeToken(): Promise<boolean> {
    try {
      await Keychain.resetGenericPassword({
        service: TOKEN_KEY,
      });
      return true;
    } catch (error) {
      console.error('Failed to remove token from keychain:', error);
      return false;
    }
  },
};
