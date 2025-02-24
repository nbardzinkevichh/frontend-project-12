import {ErrorMessage, Field, Formik, FormikHelpers} from "formik";
import {Button, FloatingLabel, Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../feauters/store.ts";
import { User } from "../Login/Login.tsx";
import { formSchema } from "../../feauters/Signup/validation.ts";
import newUserRequest from "../../feauters/Signup/newUserRequest.ts";
import {setCredentials} from "../../feauters/Login/authSlice.ts";
import Header from "../Header.tsx";
import {useTranslation} from "react-i18next";
import useErrorHandler from "../../hooks/useErrorHandler.ts";

export interface UserToRegister extends User {
  passwordConfirmation: string;
}

export default function  Signup() {
  const { t } = useTranslation('forms');

  const initialValues: UserToRegister = { username: '', password: '', passwordConfirmation: ''};

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errorHandler = useErrorHandler();


  const handleSubmit =
    async (values: UserToRegister, { setSubmitting, setErrors, resetForm }: FormikHelpers<UserToRegister>): Promise<void> => {
    try {
      setSubmitting(false);
      await newUserRequest(values).then((response): void => {
        const { username, token } = response.data;
        localStorage.setItem("username", username)
        localStorage.setItem("token", token)
        dispatch(setCredentials({ username, token }))
        resetForm();
      }).then(() => {
        navigate("/");
      })
    } catch (e) {
      errorHandler(e, null, setErrors);
    }
  };

  return (
    <>
      <Header status='loggedOut' />
      <Formik
        initialValues={initialValues}
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
            <div className='mw-400 text-center'>
              <h1>Регистрация</h1>
              <Form onSubmit={handleSubmit} className="d-flex gap-20 flex-column">
                <FloatingLabel
                  controlId="username"
                  label={t("signup.usernameInput")}
                >
                  <Field
                    as={Form.Control}
                    name="username"
                    type="text"
                    placeholder="Имя пользователя"
                    className='mb-3'
                    isInvalid={!!errors.username && touched.username}
                  />
                  <ErrorMessage name='username' >
                    { msg => <div className="invalid-feedback my-2">{msg}</div>}
                  </ErrorMessage>
                </FloatingLabel>

                <FloatingLabel
                  controlId="password"
                  label={t('passwordInput')}
                >
                  <Field
                    as={Form.Control}
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    className='mb-3'
                    isInvalid={!!errors.password && touched.password}
                  />

                  <ErrorMessage name='password' >
                    { msg => <div className="invalid-feedback mb-2">{msg}</div>}
                  </ErrorMessage>
                </FloatingLabel>

                <FloatingLabel
                  controlId="passwordConfirmation"
                  label={t('signup.passwordConfirmationInput')}
                >
                  <Field
                    as={Form.Control}
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Подвердите пароль"
                    className='mb-3'
                    isInvalid={!!errors.passwordConfirmation && touched.passwordConfirmation}
                  />

                  <ErrorMessage name='passwordConfirmation' >
                    { msg => <div className="invalid-feedback">{msg}</div>}
                  </ErrorMessage>
                </FloatingLabel>

                <Button variant="primary" type="submit" className="mt-2 py-2">
                  {t('signup.signupButton')}
                </Button>

              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
};