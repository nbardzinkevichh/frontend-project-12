// import { Formik } from "formik"

// export default function Login(formik: typeof Formik) {
//   return (
//     <>
//       <h1>Войти</h1>
//       <Form onSubmit={formik.handleSubmit}>
//         <Form.Group className="mb-3" controlId="formUsername">
//           <Form.Control type="text" placeholder="Ваш ник" onChange={formik.handleChange('username')} value={formik.values.username} />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formPassword">
//           <Form.Control type="password" placeholder="Пароль" onChange={formik.handleChange('password')} value={formik.values.password} />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Войти
//         </Button>
//       </Form>
//     </>
//   )
// }