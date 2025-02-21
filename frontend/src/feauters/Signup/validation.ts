import { User } from "../Login/Login";
import * as Yup from 'yup';

export const formSchema: Yup.Schema<User> = Yup.object().shape({
  username: Yup
    .string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: Yup
    .string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),

  passwordConfirmation: Yup
    .string()
    .required('Обязательное поле')
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
});