
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  type: 'guest' | 'host';
  password: string;
  avatar?: string;
}

interface UserData {
  users: User[];
}

// Simulate async operations with localStorage since we can't modify JSON files directly in frontend
const STORAGE_KEY = 'stayease_users_db';

export const initializeUserDatabase = (): UserData => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return JSON.parse(existing);
  }
  
  const initialData: UserData = { users: [] };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const data = initializeUserDatabase();
  return data.users.find(user => user.email === email) || null;
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const data = initializeUserDatabase();
  
  // Check if user already exists
  const existingUser = data.users.find(user => user.email === userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
  };
  
  data.users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  
  return newUser;
};

export const authenticateUser = async (email: string, password: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const user = await findUserByEmail(email);
  
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  return user;
};
