import { createContext, useContext, useState } from 'react';

interface AdminContextProps {
  isAdmin: boolean;
  toggleAdmin: () => void;
}

const AdminContext = createContext<AdminContextProps>({
  isAdmin: false,
  toggleAdmin: () => {},
});

export const useAdminContext = () => {
  return useContext(AdminContext);
};

export const AdminContextProvider: React.FC = ({ children }:any) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const toggleAdmin = () => {
    setIsAdmin((prev) => !prev);
  };

  const contextValue: AdminContextProps = {
    isAdmin,
    toggleAdmin,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};
