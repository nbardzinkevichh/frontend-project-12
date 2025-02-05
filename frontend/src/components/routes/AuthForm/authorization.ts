import axios from 'axios';
import routes from '../routes';

const authorize = async (values: {username: string; password: string}): Promise<void> => {
  const loginRoute = routes.login();
  await axios.post(loginRoute, values).then((response): void => {
    localStorage.setItem("user", response.data.username);
    localStorage.setItem("token", response.data.token);
  });
};

export default authorize;