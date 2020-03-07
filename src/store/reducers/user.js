import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util';

const initialState = {
  userId: null,
  email: null,
};

export const userUpdate = (state, action) => {
  const updateState = {
    userId: action.userId,
    email: action.email,
  };
  return updateObject(state, updateState);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_UPDATE:
      return userUpdate(state, action);
    default:
      return state;
  }
};
