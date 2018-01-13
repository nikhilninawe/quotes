import { USER_ACTION } from './types';

export const userAction = (action) => {
    return {
      type: USER_ACTION,
      payload: action 
    };
  };
