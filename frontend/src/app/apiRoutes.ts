interface Routes {
  [key: string]: (id?: number) => string; 
}

const routes: Routes = {
  home: () => '/',
  signUp: () => '/api/v1/signup',
  login: () => '/api/v1/login',
  channels: () => '/api/v1/channels',
  editChannel: (id) => `/api/v1/channels/${id}`,
  messages: () => '/api/v1/messages',
  editMessage: (id) => `/api/v1/messages/${id}`,
};

export default routes;