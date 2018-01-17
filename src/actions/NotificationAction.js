import { NOTIFICATION_CHANGE, AUTO_PLAY_EVENT } from './types';

export const notificationChange = (notification, frequency) => {
    return {
      type: NOTIFICATION_CHANGE,
      payload: { notification, frequency }
    };
  };

export const autoplay = (enabled, interval) => {
  return {
    type: AUTO_PLAY_EVENT,
    payload: { enabled, interval }
  };
};

