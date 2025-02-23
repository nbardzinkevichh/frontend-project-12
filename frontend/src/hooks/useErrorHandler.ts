import { showError } from '../toastify/toasts.ts';
import axios, {AxiosError} from "axios";
import {useTranslation} from "react-i18next";

type ErrorHandler = (error: unknown | AxiosError, message?: string) => void;
interface ErrorStatuses {
  [key: number]: () => void;
}

const useErrorHandler = (): ErrorHandler => {
  const { t } = useTranslation('toasts');

  const errorStatuses: ErrorStatuses = {
    401: () => showError(t('authError')),
    403: () => showError(t('authorizationError')),
  };

  return ((error: unknown | AxiosError, message?: string) => {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        showError(t('networkError'))
      } if (error.response && error.status) {
          errorStatuses[error.status]?.();
        }
      } else {
      if (error instanceof Error) {
        showError(error.message);
      }
      showError(message ?? "Неизвестная ошибка");
    }
  });
};

export default useErrorHandler;