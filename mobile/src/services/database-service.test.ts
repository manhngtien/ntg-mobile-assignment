jest.mock('react-native-nitro-sqlite', () => ({
  open: jest.fn(),
}));
jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
  ACCESS_CONTROL: { BIOMETRY_ANY_OR_DEVICE_PASSCODE: 'biometryAnyOrDevicePasscode' },
  ACCESSIBLE: { WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'whenUnlockedThisDeviceOnly' },
}));
jest.mock('react-native-config', () => ({
  API_BASE_URL: 'http://localhost:3000',
  DB_NAME: 'test.db',
}));

import * as Keychain from 'react-native-keychain';

describe('databaseService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    (Keychain.setGenericPassword as jest.Mock).mockResolvedValue(true);
    (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(false);
    (Keychain.resetGenericPassword as jest.Mock).mockResolvedValue(true);
  });

  it('should call open and create table on first getDB', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { open } = require('react-native-nitro-sqlite');
    const freshMockDb = { executeAsync: jest.fn().mockResolvedValue({ results: [] }) };
    (open as jest.Mock).mockReturnValue(freshMockDb);

    const service = require('./database-service').databaseService;
    const user = { id: 1, username: 'test', email: 'test@test.com', age: 25, role: 'user', firstName: 'T', lastName: 'U', createdAt: '', updatedAt: '' };
    await service.saveUser(user);
    expect(freshMockDb.executeAsync).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('User saved successfully');
    consoleSpy.mockRestore();
  });

  it('should reuse cached db on second call', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { open } = require('react-native-nitro-sqlite');
    const freshMockDb = { executeAsync: jest.fn().mockResolvedValue({ results: [] }) };
    (open as jest.Mock).mockReturnValue(freshMockDb);

    const service = require('./database-service').databaseService;
    const user = { id: 1, username: 'test', email: 'test@test.com', age: 25, role: 'user', firstName: 'T', lastName: 'U', createdAt: '', updatedAt: '' };
    await service.saveUser(user);
    await service.saveUser(user);
    expect(open).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('User saved successfully');
    expect(consoleSpy).toHaveBeenCalledTimes(2);
    consoleSpy.mockRestore();
  });

  it('should return user from results', async () => {
    const { open } = require('react-native-nitro-sqlite');
    const mockUser = { id: 1, username: 'test', email: 'test@test.com' };
    const freshMockDb = { executeAsync: jest.fn().mockResolvedValue({ results: [mockUser] }) };
    (open as jest.Mock).mockReturnValue(freshMockDb);

    const service = require('./database-service').databaseService;
    const result = await service.getUser();
    expect(result).toEqual(mockUser);
  });

  it('should return null when no results', async () => {
    const { open } = require('react-native-nitro-sqlite');
    const freshMockDb = { executeAsync: jest.fn().mockResolvedValue({ results: [] }) };
    (open as jest.Mock).mockReturnValue(freshMockDb);

    const service = require('./database-service').databaseService;
    const result = await service.getUser();
    expect(result).toBeNull();
  });

  it('should delete users', async () => {
    const { open } = require('react-native-nitro-sqlite');
    const freshMockDb = { executeAsync: jest.fn().mockResolvedValue({ results: [] }) };
    (open as jest.Mock).mockReturnValue(freshMockDb);

    const service = require('./database-service').databaseService;
    await service.deleteUser();
    expect(freshMockDb.executeAsync).toHaveBeenCalledWith('DELETE FROM users');
  });

  it('should handle saveUser error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { open } = require('react-native-nitro-sqlite');
    let callCount = 0;
    const freshMockDb = {
      executeAsync: jest.fn().mockImplementation(async (sql: string) => {
        callCount++;
        if (callCount === 1) {
          return { results: [] }; // getDB CREATE TABLE call
        }
        throw new Error('DB error'); // actual save call
      }),
    };
    (open as jest.Mock).mockReturnValue(freshMockDb);

    const service = require('./database-service').databaseService;
    const user = { id: 1, username: 'test', email: 'test@test.com', age: 25, role: 'user', firstName: 'T', lastName: 'U', createdAt: '', updatedAt: '' };
    await expect(service.saveUser(user)).resolves.not.toThrow();
    expect(consoleSpy).toHaveBeenCalledWith('Error saving user:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});
