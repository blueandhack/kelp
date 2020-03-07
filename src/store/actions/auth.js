import * as actionTypes from './actionTypes';
import { apolloClient } from '../../util';
import { USER_LOGIN, USER_REFRESH_TOKEN } from '../../api/user';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

const authSuccess = (token, refreshToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    refreshToken,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const getAccessToken = (email, password) => async (dispatch) => {
  try {
    const response = await apolloClient.mutate({
      mutation: USER_LOGIN,
      variables: { email, password },
    });
    const { token, refreshToken } = response.data.tokenCreate;
    await dispatch(authSuccess(token, refreshToken));
  } catch (error) {
    // message.error(error.graphQLErrors[0].message);
    console.error(error);
    await dispatch(authFail(error));
    throw error;
  }
};

export const refreshToken = (oldRefreshToken) => async (dispatch) => {
  try {
    const response = await apolloClient.mutate({
      mutation: USER_REFRESH_TOKEN,
      variables: { refreshToken: oldRefreshToken },
    });
    const { token, refreshToken: newRefreshToken } = response.data.tokenRefresh;
    return await dispatch(authSuccess(token, newRefreshToken));
  } catch (error) {
    await dispatch(authFail(error));
    throw error;
  }
};

export const auth = (email, password) => async (dispatch) => {
  await dispatch(authStart());
  try {
    await dispatch(getAccessToken(email, password));
  } catch (error) {
    // console.error(error);
    // console.table(error.response.data);
    await dispatch(authFail(error));
    throw error;
  }
};
