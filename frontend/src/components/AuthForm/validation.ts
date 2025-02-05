import { FormValues } from "./AuthForm";
import * as Yup from 'yup';

export const formSchema: Yup.Schema<FormValues> = Yup.object().shape({
  username: Yup
    .string()
    .required(),
  password: Yup.
    string()
    .required()
});
