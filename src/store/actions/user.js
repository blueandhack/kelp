import * as actionTypes from './actionTypes';
import { apolloClient } from '../../util';
import { USER_CURRENT } from '../../api/user';

export const userUpdate = (user) => {
  if (user === null) {
    return {
      type: actionTypes.USER_UPDATE,
      userId: null,
      email: null,
    };
  }
  return {
    type: actionTypes.USER_UPDATE,
    userId: user._id,
    email: user.email,
  };
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    const response = await apolloClient.query({
      query: USER_CURRENT,
      fetchPolicy: 'network-only',
    });
    const { data } = response;
    const { userCurrent } = data;
    if (userCurrent !== null) {
      return await dispatch(userUpdate(userCurrent));
    }
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
