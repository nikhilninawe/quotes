import { NOTIFICATION_CHANGE, AUTO_PLAY_EVENT } from '../actions/types';

const INITIAL_STATE = { notification: true, frequency: 3, autoplayEnabled: false, autoplayInterval: 30 };
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NOTIFICATION_CHANGE :
            return {
                ...state,
                notification: action.payload.notification,
                frequency: action.payload.frequency
            };
        case AUTO_PLAY_EVENT:
            return {
                ...state,
                autoplayEnabled: action.payload.enabled,
                autoplayInterval: action.payload.interval
            };
        default:
            return state;
    }
};
