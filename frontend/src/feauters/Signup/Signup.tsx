import {ErrorMessage, Field, Formik, FormikHelpers} from "formik";
import {Button, FloatingLabel, Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { User } from "../Login/Login";
import { formSchema } from "./validation";
import newUserRequest from "./newUserRequest.ts";
import {setCredentials} from "../Login/authSlice.ts";
import Header from "../../components/Header.tsx";
import {useTranslation} from "react-i18next";

export interface UserToRegister extends User {
  passwordConfirmation: string;
};


// При попытке регистрации пользователя с уже существующим логином, сервер ответит ошибкой с кодом 409. Реализуйте обработку ошибки серверной валидации показом соответствующего сообщения.

export default function  Signup() {
  const { t } = useTranslation('forms');

  const initialValues: UserToRegister = { username: '', password: '', passwordConfirmation: ''};

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: UserToRegister, { setSubmitting, setErrors, resetForm }: FormikHelpers<User>): Promise<void> => {
    try {
      setSubmitting(false);
      console.log(values);
      await newUserRequest(values).then((response): void => {
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
      if (e.status === 409) {
        setErrors({ username: 'Такой пользователь уже существует' });
      } else {
        setErrors({ username: "Неверные имя пользователя или пароль" });
      }

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
                  label={t("signup.usernameInput")}
                >
                  <Field
                    as={Form.Control}
                    name="username"
                    id="usernameInput"
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

                  label={t('passwordInput')}
                >
                  <Field
                    as={Form.Control}
                    name="password"
                    id="password"
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
                  label={t('signup.passwordConfirmationInput')}
                >
                  <Field
                    as={Form.Control}
                    name="passwordConfirmation"
                    id="passwordConfirmation"
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