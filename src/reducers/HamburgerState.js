
import { HAMBURGER_STATE_CHANGE } from '../actions/types';

const INITIAL_STATE = { active: false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HAMBURGER_STATE_CHANGE: {
            return {
                ...state,
                active: !state.active
            };
        }
        default:
            return state;
    }
};
