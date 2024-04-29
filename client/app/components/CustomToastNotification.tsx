import React, { useEffect } from 'react';

interface CustomToastNotificationProps {
  message: string;
  isSuccess: boolean;
}

const CustomToastNotification: React.FC<CustomToastNotificationProps> = ({
  message,
  isSuccess,
}) => {
  useEffect(() => {
    const notification = document.createElement('div');
    const textColor = isSuccess ? 'text-blue-700' : 'text-red-700';
    notification.className = `fixed bottom-4 right-4 bg-white ${textColor} p-2 rounded-xl shadow-xl font-semibold`;
    notification.textContent = message;
    document.body.appendChild(notification);

    const timer = setTimeout(() => {
      document.body.removeChild(notification);
    }, 4000);

    return () => clearTimeout(timer);
  }, [message, isSuccess]);

  return null;
};

export default CustomToastNotification;
