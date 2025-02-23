import { showError } from '../toastify/toasts.ts';
import axios, {AxiosError} from "axios";
import {useTranslation} from "react-i18next";

type ErrorHandler = (error: unknown | AxiosError, message?: string) => void;

const useErrorHandler = (): ErrorHandler => {
  const { t } = useTranslation('toasts');

  return ((error: unknown | AxiosError, message?: string, ) => {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        showError(t('networkError'))
      } if (error.response) {
          if (error.status === 401) {
            showError(t('authError'));
          }
          if (error.status === 403) {
            showError(t('authorizationError'));
          }
        }
      }
      showError(message!);
  });
};

export default useErrorHandler;