import { POPUP_CLOSE, POPUP_OPEN } from '../actions/types';

const INITIAL_STATE = { active: false, quoteToShow: '' };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POPUP_CLOSE:
            return {
                ...state,
                active: false
            };
        
        case POPUP_OPEN:
            return {
                ...state,
                active: true,
                quoteToShow: action.payload
            };
        default:
            return state;
    }
};
