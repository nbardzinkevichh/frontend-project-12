import { User } from "./AuthForm";
import * as Yup from 'yup';

export const formSchema: Yup.Schema<User> = Yup.object().shape({
  username: Yup
    .string()
    .required(),
  password: Yup.
    string()
    .required()
});
