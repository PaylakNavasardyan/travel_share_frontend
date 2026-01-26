import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  userName: string;
  email: string;
  name?: string;
  surname?: string;
  profilePicture?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      setUserState(JSON.parse(savedUser))
    }
  }, []);

  const setUser = (user: User | null) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    setUserState(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('Something went wrong with the user constext');
  }
  return context;
}
