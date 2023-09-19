import { createContext, useContext, useState, useEffect } from "react";

const ErrorContext = createContext();
export const useError = () => useContext(ErrorContext);

export default function ErrorProvider({ children }) {
  const [error, pushError] = useState("");

  useEffect(() => {
    let id;
    if (error) {
      id = setTimeout(() => {
        pushError(null);
      }, 2000);
    }
    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  });

  return (
    <ErrorContext.Provider value={[error, pushError]}>
      {children}
    </ErrorContext.Provider>
  );
}
