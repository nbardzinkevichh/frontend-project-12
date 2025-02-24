import { showError } from '../lib/toastify/toasts.ts';
import axios, {AxiosError} from "axios";
import {useTranslation} from "react-i18next";

type ErrorHandler = (error: unknown | AxiosError, message: string | null, handler?: Handler) => void;
interface ErrorStatuses {
  [key: number]: (handler?: Handler) => void;
}

type Handler = (params: { [key: string]: string}) => void;


const useErrorHandler = (): ErrorHandler => {
  const { t } = useTranslation('toasts');
  const { t: tForms } = useTranslation('forms');

  const errorStatuses: ErrorStatuses = {
    401: (handler?: Handler) => handler!({username: tForms('validation.usernameOrPasswordIsIncorrect')}),
    403: () => showError(t('authorizationError')),
    409: (handler?: Handler) => handler!({username: 'Такой пользователь уже существует'}),
  };

  return ((error: unknown | AxiosError, message: string | null, handler?: Handler) => {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        showError(t('networkError'))
      } if (error.response && error.status) {
          if (error.status === 403) {
            errorStatuses[403]();
          }
          errorStatuses[error.status](handler);
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