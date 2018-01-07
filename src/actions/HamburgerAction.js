import { HAMBURGER_STATE_CHANGE } from './types';

export const changeHamburgerStatus = () => {
    return {
      type: HAMBURGER_STATE_CHANGE,
    };
  };
