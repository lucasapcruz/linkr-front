import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export function AuthProvider(props) {
  const [user, setUser] = useState({
    token: undefined,
    name: undefined,
    pictureUrl: undefined,
  });

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) setUser(JSON.parse(userStorage));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
