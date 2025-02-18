import {toast } from "react-toastify";
import {toastifyConfig} from "./toastifyConfig.ts";

export const showError = (errorMessage: string): void => {
  toast.error(errorMessage, toastifyConfig);
};
export const showSuccess = (successMessage: string) => {
  toast.success(successMessage, toastifyConfig);
}

// export const showWarning = (warningMessage: string) => {}
// export const showInfo = (warningMessage: string) => {}
