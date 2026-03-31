import { open } from 'react-native-nitro-sqlite';
import { DB_NAME } from '../constants';
import { User } from '../models/user';

let db: ReturnType<typeof open> | null = null;

const getDB = async () => {
  if (db) {
    return db;
  }

  db = open({ name: DB_NAME });
  await db.executeAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      age INTEGER,
      role TEXT,
      firstName TEXT,
      lastName TEXT,
      createdAt TEXT,
      updatedAt TEXT
    )
  `);

  return db;
};

export const databaseService = {
  async saveUser(user: User): Promise<void> {
    const database = await getDB();
    await database
      .executeAsync(
        `INSERT OR REPLACE INTO users (id, username, email, age, role, firstName, lastName, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user.id,
          user.username,
          user.email,
          user.age,
          user.role,
          user.firstName,
          user.lastName,
          user.createdAt,
          user.updatedAt,
        ],
      )
      .then(() => {
        console.log('User saved successfully');
      })
      .catch((error) => {
        console.error('Error saving user:', error);
      });
  },

  async getUser(): Promise<User | null> {
    const database = await getDB();
    const { results } = await database.executeAsync(
      'SELECT * FROM users ORDER BY rowid DESC LIMIT 1',
    );

    if (results.length === 0) {
      return null;
    }

    return results[0] as unknown as User;
  },

  async deleteUser(): Promise<void> {
    const database = await getDB();
    await database.executeAsync('DELETE FROM users');
  },
};
