import {Field, Formik, FormikHelpers} from "formik";
import {Button, Col, Container, FloatingLabel, Image, Form, Row} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../feauters/store.ts";
import { User } from "../Login/Login.tsx";
import { formSchema } from "../../feauters/Signup/validation.ts";
import newUserRequest from "../../feauters/Signup/newUserRequest.ts";
import {setCredentials} from "../../feauters/Login/authSlice.ts";
import Header from "../Header.tsx";
import {useTranslation} from "react-i18next";
import useErrorHandler from "../../hooks/useErrorHandler.ts";

import SignupImage from '../../assets/signup.jpg';
import LoginImage from "../../assets/login.jpg";

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
      <Container className="h-100">


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

          <Row className="d-flex justify-content-center align-items-center align-content-center h-100">
            <Col xs={12} md={8} xxl={6}>
              <div className="card shadow-sm">
                <Row className="card-body p-5">
                  <Col className="d-flex align-items-center justify-content-center">
                    <img className="rounded-circle" src={SignupImage} alt="Регистрация" />
                  </Col>
                  <Col>
                    <div className='mw-400 text-center'>
                      <h1 className="mb-4">Регистрация</h1>
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
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.username}
                          </Form.Control.Feedback>
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

                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.password}
                          </Form.Control.Feedback>
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
                        </FloatingLabel>

                        <Button variant="primary" type="submit" className="mt-2 py-2">
                          {t('signup.signupButton')}
                        </Button>

                      </Form>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>


            </Row>
        )}
      </Formik>
      </Container>
    </>
  )
};
