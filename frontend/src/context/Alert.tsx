import React from 'react';

interface AlertProps {
  alertType: 'success' | 'warning' | 'error';
  message: string;
}

// reusable alert component with different alert types
const Alert: React.FC<AlertProps> = ({ alertType, message }) => {
  const alertClasses = {
    success: 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
    warning: 'bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
    error: 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-100'
  };

  return (
    <div
      className={`max-w-11/12 text-center mx-auto my-2 mr-1 w-full rounded-md px-2 py-4 text-sm shadow-md sm:w-[450px] ${alertClasses[alertType]}`}
    >
      {message}
    </div>
  );
};

export default Alert;