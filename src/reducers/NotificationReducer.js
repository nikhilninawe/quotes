import { NOTIFICATION_CHANGE, AUTO_PLAY_EVENT } from '../actions/types';

const INITIAL_STATE = { notification: true, frequency: '3', autoPlayEnabled: true, autoPlayInterval: 8000 };
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
                autoPlayEnabled: action.payload
            };
        default:
            return state;
    }
};
