import axios, { AxiosResponse } from 'axios';
import routes from '../../app/apiRoutes';
import { User } from './Login';

const authorize =
  async (values: User): Promise<AxiosResponse<{ username: string; token: string}>> => {
  const loginRoute = routes.login();
  return await axios.post(loginRoute, values);
  
};

export default authorize;