import { REHYDRATE } from 'redux-persist/lib/constants';

const middleware = {
  token: null,
};

const authTokenMiddleware = () => (next) => (action) => {
  if (action.type === REHYDRATE) {
    if (action.payload && action.payload.auth && action.payload.auth.token) {
      middleware.token = action.payload.auth.token;
    }
  }
  if (action.type === 'AUTH_SUCCESS') {
    const { token } = action;
    middleware.token = token;
  }
  return next(action);
};

export { middleware, authTokenMiddleware };
