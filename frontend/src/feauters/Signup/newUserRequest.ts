import axios, { AxiosResponse } from 'axios';
import routes from '../../app/apiRoutes';
import {UserToRegister} from "../../components/Signup/Signup.tsx";

const newUserRequest = async (user: UserToRegister): Promise<AxiosResponse> => {
  const signupRoute = routes.signUp();
  return await axios.post(signupRoute, { username: user.username, password: user.password });
};

export default newUserRequest;

