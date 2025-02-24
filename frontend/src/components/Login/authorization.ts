import axios, { AxiosResponse } from 'axios';
import routes from '../../app/apiRoutes.ts';
import { User } from './Login.tsx';

const authorize =
  async (values: User): Promise<AxiosResponse<{ username: string; token: string}>> => {
  const loginRoute = routes.login();
  return await axios.post(loginRoute, values);
  
};

export default authorize;