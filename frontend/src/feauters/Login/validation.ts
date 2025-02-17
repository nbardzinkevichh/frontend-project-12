import { User } from "./Login";
import * as Yup from 'yup';

export const formSchema: Yup.Schema<User> = Yup.object().shape({
  username: Yup
    .string(),
  password: Yup.
    string()
});
