import { POPUP_CLOSE, POPUP_OPEN } from './types';

export const popupClose = () => {
    return {
        type: POPUP_CLOSE
    };
};


export const popupOpen = (quote) => {
    return {
        type: POPUP_OPEN,
        payload: quote
    };
};

