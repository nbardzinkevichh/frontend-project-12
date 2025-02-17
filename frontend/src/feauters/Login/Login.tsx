import {Formik, Field, FormikHelpers} from 'formik';
import { formSchema } from './validation.ts';
import { Form, Button }  from 'react-bootstrap';
import authorize from './authorization.ts';
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from '../../app/store.ts';
import { setCredentials } from './authSlice.ts';
import Header from "../../components/Header.tsx";

export interface User {
  username?: string;
  password?: string;
}

const FormikFeedBackError = ({ message } : { message: string}) => {
  return <div className="invalid-feedback">{message}</div>;
};

export default function  AuthForm(): JSX.Element {
  const initialValues: User = { username: '', password: ''};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: User, { setSubmitting, setErrors, resetForm }: FormikHelpers<User>): Promise<void> => {
    try {
      setSubmitting(false);
      await authorize(values).then((response): void => {
        console.log(response);
        const { username, token } = response.data;
        localStorage.setItem("username", username)
        localStorage.setItem("token", token)
        dispatch(setCredentials({ username, token }))
      }).then(() => {
        resetForm();
        navigate("/");
      })
    } catch (e) {
      console.log(e);
      setErrors({ username: "Неверные имя пользователя или пароль" });
    }
  };
  
  return (
    <>
    <Header status='loggedOut' />
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
    >
      {( {
           touched,
           errors,
           handleSubmit,
         }) => (

        <div className='d-flex justify-content-center align-items-center vh-100' >
          <img src="" alt="" />
          <div className='w-400 text-center'>
            <h1>Войти</h1>
            <Form onSubmit={handleSubmit}>
              <Field
                as={Form.Control}
                name="username"
                required
                type="text"
                placeholder="Ваш ник"
                className='mb-3'
                isInvalid={!!errors.username && touched.username}
              />
              <Field
                as={Form.Control}
                required
                name="password"
                type="password"
                placeholder="Пароль"
                className='mb-3'
                isInvalid={!!errors.username && touched.username}
              >
              </Field>

              { errors && <FormikFeedBackError message={errors.username!}/>}


              <Button variant="primary" type="submit" className="my-2">
                Войти
              </Button>

            </Form>

            <div className='mt-3'>Нет аккаунта? <a href="/signup">Регистрация</a></div>
          </div>
        </div>
      )}
    </Formik>
  </>
  )
};
