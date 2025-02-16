import { Formik, Field, FormikHelpers } from 'formik';
import { formSchema } from './validation.ts';
import { Form, Button }  from 'react-bootstrap';
import authorize from './authorization.ts';
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from '../../app/store.ts';
import { setCredentials } from './authSlice.ts';

export interface User {
  username: string;
  password: string;
}

const FormikFeedBackError = ({ message } : { message: string}) => {
  return (
    <Form.Control.Feedback type="invalid">
      { message }
    </Form.Control.Feedback>
  )
};

export default function  AuthForm(): JSX.Element {
  const initialValues: User = { username: '', password: ''};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: User, { setSubmitting, setErrors, resetForm }: FormikHelpers<User>): Promise<void> => {
    try {
      setSubmitting(false);
      await authorize(values).then((response): void => {
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
        <>
          <img src="" alt="" />
          <div className="auth-form">
            <h1>Войти</h1>
            <Form onSubmit={handleSubmit}>
              <Field 
                as={Form.Control}
                name="username"
                required
                type="text"
                placeholder="Ваш ник"
                className={`mb-3 ${
                  touched.username && errors.username ? "is-invalid" : ""
                }`}
                />
              <Field
                as={Form.Control}
                required
                name="password"
                type="password"
                placeholder="Пароль"
                className={`mb-3 ${touched.password && errors.password ? "is-invalid" : ''}`}
                >
                </Field>

                { errors && <FormikFeedBackError message={errors.username!}/>}

              <Button variant="primary" type="submit">
                Войти
              </Button>
              
            </Form>
          </div>
          </>
      )}
    </Formik>
  )
};
