import { DISABLE_GESTURE } from '../actions/types';

const INITIAL_STATE = { swipeGesture: true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DISABLE_GESTURE:
            return {
                ...state,
                swipeGesture: false
            };
        default:
            return state;
    }
};
