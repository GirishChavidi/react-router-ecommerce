import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  // load from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuth");
    const storedUser = localStorage.getItem("user");

    if (storedAuth === "true" && storedUser) {
      setIsAuth(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    if (email && password) {
      const fakeUser = { email };

      setIsAuth(true);
      setUser(fakeUser);

      localStorage.setItem("isAuth", "true");
      localStorage.setItem("user", JSON.stringify(fakeUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};



