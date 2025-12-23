'use client';
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import Alert from './Alert';

interface AlertData {
  id: number;
  type: 'success' | 'warning' | 'error';
  msg: string;
}

interface AlertContextType {
  setAlert: (type: 'success' | 'warning' | 'error', msg: string) => void;
}

const AlertContext = createContext<AlertContextType>({
  setAlert: () => { },
});

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alertArray, setAlertArray] = useState<AlertData[]>([]);

  // function to remove alert by id
  const removeAlert = (removeId: number) => {
    setAlertArray((arr) => arr.filter(({ id }) => id !== removeId));
  };

  // function to set a new alert & auto remove after 5 seconds
  const setAlert = (type: 'success' | 'warning' | 'error', msg: string) => {
    const id = Date.now();
    setAlertArray((arr) => [
      ...arr,
      { id, type, msg }
    ]);

    setTimeout(() => {
      removeAlert(id);
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ setAlert }}>
      {children}
      {alertArray.length > 0 && (
        <div className="fixed left-1/2 top-10 z-50 w-11/12 -translate-x-1/2 gap-1 sm:w-fit">
          {alertArray.map((alert) => (
            <div key={alert.id} className="relative">
              <Alert alertType={alert.type} message={alert.msg} />
            </div>
          ))}
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);