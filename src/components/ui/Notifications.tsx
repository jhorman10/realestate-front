import { useEffect } from 'react';
import { HiCheck, HiExclamation, HiInformationCircle, HiX } from 'react-icons/hi';
import { useAppSelector, useAppDispatch } from '../../store';
import { removeNotification } from '../../store/slices/uiSlice';

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'success':
      return <HiCheck className="h-5 w-5" />;
    case 'error':
      return <HiX className="h-5 w-5" />;
    case 'warning':
      return <HiExclamation className="h-5 w-5" />;
    case 'info':
    default:
      return <HiInformationCircle className="h-5 w-5" />;
  }
};

const getToastClasses = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 border-green-300';
    case 'error':
      return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200 border-red-300';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200 border-yellow-300';
    case 'info':
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200 border-blue-300';
  }
};

export const Notifications = () => {
  const notifications = useAppSelector((state) => state.ui.notifications);
  const dispatch = useAppDispatch();

  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.timeout) {
        const timer = setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, notification.timeout);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, dispatch]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center p-4 rounded-lg border shadow-lg ${getToastClasses(notification.type)}`}
        >
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
            <NotificationIcon type={notification.type} />
          </div>
          <div className="ml-3 text-sm font-normal">{notification.message}</div>
          <button
            onClick={() => dispatch(removeNotification(notification.id))}
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <HiX className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
