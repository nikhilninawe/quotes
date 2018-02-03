import { USER_ACTION, USER_ID } from './types';

export const userAction = (action) => {
    return {
      type: USER_ACTION,
      payload: action 
    };
};

export const userIdAction = (userId) => {
  return {
    type: USER_ID,
    payload: userId
  };
};
