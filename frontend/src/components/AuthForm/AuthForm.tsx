import { useFormik, Formik, FormikProps, FormikErrors, ErrorMessage } from 'formik';
import { formSchema } from './validation';
import { Form, Button }  from 'react-bootstrap';

export interface FormValues {
  username: string;
  password: string;
}

// interface OtherProps {
//   message: string;
// }

//axios.post('/api/v1/login', { username: 'admin', password: 'admin' }).then((response) => {
//   console.log(response.data); // => { token: ..., username: 'admin' }
// });
//

export default function AuthForm(): JSX.Element {
  const initialValues: FormValues = { username: '', password: '' };
  // const initialErrors: FormikErrors<FormValues> = {};
  // const formik = useFormik({
  //   initialValues,
  //   initialErrors,
  //   onSubmit: async (values) => {
  //     await axios.post('/api/v1/login', values).then((response) => {
  //       console.log(response.data);
  //     })
  //   },
  //   validationSchema: formSchema
  // });

  // console.log(formik);

  return (
    <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
        validationSchema={formSchema}
      >
        {( {values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      isSubmitting }) => (
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
                <Form.Control.Feedback type="invalid">
                  Неверные имя пользователя или пароль
                </Form.Control.Feedback>
                
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

{/*  */}