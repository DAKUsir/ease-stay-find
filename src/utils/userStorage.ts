
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
  
  // Initialize with some sample data for easier testing
  const initialData: UserData = { 
    users: [
      {
        id: '1',
        email: 'guest@example.com',
        firstName: 'Guest',
        lastName: 'User',
        type: 'guest',
        password: 'password123',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
      },
      {
        id: '2',
        email: 'host@example.com',
        firstName: 'Host',
        lastName: 'User',
        type: 'host',
        password: 'password123',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
      }
    ] 
  };
  
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
  
  // Log current users for debugging
  console.log('Users after creation:', JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}').users);
  
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

export const getAllUsers = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const data = initializeUserDatabase();
  return data.users;
};

export const updateUserData = async (userId: string, updates: Partial<Omit<User, 'id'>>): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const data = initializeUserDatabase();
  const userIndex = data.users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  data.users[userIndex] = {
    ...data.users[userIndex],
    ...updates
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data.users[userIndex];
};
