import { USER_ACTION } from '../actions/types';

const INITIAL_STATE = { saveActive: false, shareStarted: false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_ACTION:
            switch (action.payload) {
                case 'save_start' :
                    return {
                        ...state,
                        saveActive: true
                    };
                case 'save_end' :
                    return {
                        ...state,
                        saveActive: false
                    };
                case 'share_start' :
                    return {
                        ...state,
                        shareStarted: true
                    };
                case 'share_end' :
                    return {
                        ...state,
                        shareStarted: false
                    };
                default:
                    return state;
            }
        default:
            return state;
    }
};
