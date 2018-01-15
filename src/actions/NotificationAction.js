import { AsyncStorage } from 'react-native';
import { NOTIFICATION_CHANGE, AUTO_PLAY_EVENT } from './types';

export const notificationChange = (notification, frequency) => {
    return {
      type: NOTIFICATION_CHANGE,
      payload: { frequency, notification }
    };
  };

export const autoPlay = (enabled) => {
  return {
    type: AUTO_PLAY_EVENT,
    payload: enabled
  };
};

const callback = (result) => {
  const x = result[0];
  console.log(x);
};

export const getSettingsFromDB = () => {
  AsyncStorage.multiGet(['notification', 'frequency'], callback);

  // AsyncStorage.getItem('frequency').then((value) => {
  //   this.setState({ frequency: value });
  // }).done();

// this.props.notificationChange();
//   return (dispatch) => {
//     dispatch(
//       talaikisQuotes(dispatch);
//   };
};
