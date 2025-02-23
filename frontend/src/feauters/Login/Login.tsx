import {Formik, Field, FormikHelpers, ErrorMessage} from 'formik';
import { formSchema } from './validation.ts';
import {Form, Button, FloatingLabel} from 'react-bootstrap';
import authorize from './authorization.ts';
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from '../../app/store.ts';
import { setCredentials } from './authSlice.ts';
import Header from "../../components/Header.tsx";

import {useTranslation} from 'react-i18next';
import useErrorHandler from "../../hooks/useErrorHandler.ts";

export interface User {
  username?: string;
  password?: string;
}

export default function  AuthForm() {
  const { t } = useTranslation('forms');

  const errorHandler = useErrorHandler();

  const initialValues: User = { username: '', password: ''};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit =
    async (values: User, { setSubmitting, setErrors, resetForm }: FormikHelpers<User>): Promise<void> => {

    try {
      setSubmitting(false);
      await authorize(values).then((response): void => {
        const { username, token } = response.data;
        localStorage.setItem("username", username)
        localStorage.setItem("token", token)
        dispatch(setCredentials({ username, token }))
        resetForm();
      }).then(() => {
        navigate("/");
      })
    } catch (e) {
      setErrors({ username: t('validation.usernameOrPasswordIsIncorrect')})
      errorHandler(e);
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
            <h1 className="mb-4">{t('login.title')}</h1>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="username"
                label={t('login.usernameInput')}
              >
                <Field
                  as={Form.Control}
                  name="username"
                  required
                  type="text"
                  placeholder={t('login.usernameInput')}
                  className='mb-3'
                  isInvalid={!!errors.username && touched.username}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="password"
                label={t('passwordInput')}
              >
                <Field
                  as={Form.Control}
                  required
                  name="password"
                  type="password"
                  placeholder={t('passwordInput')}
                  className='mb-3'
                  isInvalid={!!errors.username && touched.username}
                >
                </Field>

                <ErrorMessage name='username'>
                  { msg => <div className="invalid-feedback mb-2">{msg}</div>}
                </ErrorMessage>
              </FloatingLabel>



              <Button variant="primary" type="submit" className="my-2 px-4">
                {t('login.title')}
              </Button>

            </Form>

            <div className='mt-3'>{t('login.footer.noAccount')} <a href="/signup">{t('registration')}</a></div>
          </div>
        </div>
      )}
    </Formik>
  </>
  )
};
