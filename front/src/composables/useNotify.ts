import { toast, type ToastOptions } from 'vue3-toastify';

type NotifyType = 'success' | 'error' | 'info' | 'warning';

export const useNotify = (type: NotifyType, message: string, options?: ToastOptions): Promise<void> => {
  return new Promise((resolve) => {
    toast(message, {
      autoClose: 1000,
      theme: 'colored',
      position: 'top-right',
      rtl: true,
      transition: 'slide',
      dangerouslyHTMLString: true,
      type: type,
      ...options,
      onClose: () => resolve(),
    });
  });
};