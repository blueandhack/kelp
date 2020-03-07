export const API_URL = () => {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.REACT_APP_BUILD_DEV === 'true') {
      return 'https://kelp.com/graphql/';
    }
    return 'https://api.kelp.com/graphql/';
  }
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  return 'http://127.0.0.1:2019/graphql/';
};

export const WEBSOCKET_API_URL = () => {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.REACT_APP_BUILD_DEV === 'true') {
      return 'wss://kelp.com/graphql';
    }
    return 'wss://api.kelp.com/graphql';
  }
  if (process.env.REACT_APP_WEBSOCKET_API_URL) {
    return process.env.REACT_APP_WEBSOCKET_API_URL;
  }
  return 'ws://127.0.0.1:2019/graphql';
};

export const LOCAL_STORAGE_VERSION = '0.0.1';
