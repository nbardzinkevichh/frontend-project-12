import {Formik, Field, FormikHelpers } from 'formik';
import { formSchema } from '../../feauters/Login/validation.ts';
import {Form, Button, FloatingLabel, Container, Row, Col} from 'react-bootstrap';
import authorize from './authorization.ts';
import {Link, useNavigate} from "react-router-dom";

import { useAppDispatch } from '../../feauters/store.ts';
import { setCredentials } from '../../feauters/Login/authSlice.ts';
import Header from "../Header.tsx";

import {useTranslation} from 'react-i18next';
import useErrorHandler from "../../hooks/useErrorHandler.ts";

import LoginImage from '../../assets/login.jpg';

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
      errorHandler(e, null, setErrors);
    }
  };

  return (
    <>
    <Header status='loggedOut' />
    <Container className='vh-100'>

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
            <Row className="d-flex justify-content-center align-items-center align-content-center h-100">
              <Col xs={12} md={8} xxl={6}>
                <div className="card shadow-sm">
                  <Row className="card-body p-5">
                    <Col className="d-flex align-items-center justify-content-center">
                      <img className="rounded-circle" src={LoginImage} alt="Войти" />
                    </Col>
                    <Col>
                      <div className='mw-400 text-center'>
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

                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.username}
                            </Form.Control.Feedback>
                          </FloatingLabel>

                          <Button variant="primary" type="submit" className="w-100 mt-2 py-2">
                            {t('login.title')}
                          </Button>

                        </Form>
                      </div>
                    </Col>
                  </Row>
                  <div className='w-100 mt-3 card-footer text-center p-4'>{t('login.footer.noAccount')}
                    <Link to="/signup" className="fw-bold">  {t('registration')}</Link>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Formik>
    </Container>
    </>
  )
};
