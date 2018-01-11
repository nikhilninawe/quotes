import { NOTIFICATION_CHANGE } from '../actions/types';

const INITIAL_STATE = { notification: true, frequency: '3' };
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NOTIFICATION_CHANGE :
            return {
                ...state, 
                notification: action.payload.notification,
                frequency: action.payload.frequency
            };
        default:
            return state;
    }
};
