import { createContext, useContext, useState } from 'react';

// Crear el contexto
const UserContext = createContext();

// Crear un componente proveedor para envolver tu aplicación
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Crear un hook personalizado para acceder fácilmente al contexto
export const useUser = () => useContext(UserContext);
