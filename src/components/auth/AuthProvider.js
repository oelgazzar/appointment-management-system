import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export default function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthStateReady, setAuthStateReady] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthStateReady(true);
      setLoggedIn(!!user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthStateReady, loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
