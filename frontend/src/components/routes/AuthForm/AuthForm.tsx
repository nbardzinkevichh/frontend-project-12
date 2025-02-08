import { Formik } from 'formik';
import { formSchema } from './validation';
import { Form, Button }  from 'react-bootstrap';
import authorize from './authorization';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../services/store.ts';
import { setCredentials } from '../../services/authSlice.ts';

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
// Неверные имя пользователя или пароль

export default function  AuthForm(): JSX.Element {
  const initialValues: User = { username: '', password: ''};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  return (
    <Formik
        initialValues={initialValues}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting, setErrors}): Promise<void> => {
          try {
            setSubmitting(false);
            await authorize(values).then((response): void => {
              const { username, token } = response.data;
              localStorage.setItem("username", username)
              localStorage.setItem("token", token)
              dispatch(setCredentials({ username, token }))
            }).then(() => navigate("/"))
          } catch (e) {
            console.log(e);
            setErrors({ username: "Неверные имя пользователя или пароль" });
          }
        }}
        validationSchema={formSchema}
      >
      {( {
        values,
        errors,
        handleChange,
        handleSubmit,
      }) => (
        <>
          <img src="" alt="" />
          <div className="auth-form">
            <h1>Войти</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3"controlId="formUsername">
                <Form.Control 
                  required
                  type="text" 
                  placeholder="Ваш ник" 
                  onChange={handleChange('username')} 
                  value={values.username} 
                  isInvalid={!!errors.username}
                  className="mb-3"

                />
                <Form.Control
                required
                type="password"
                placeholder="Пароль"
                onChange={handleChange('password')}
                value={values.password}
                isInvalid={!!errors.username}
                />

                { errors && <FormikFeedBackError message={errors.username!}/>}
              </Form.Group>

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
