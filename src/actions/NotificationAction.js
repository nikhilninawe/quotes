import { AsyncStorage } from 'react-native';
import { NOTIFICATION_CHANGE } from './types';

export const notificationChange = (notification, frequency) => {
    return {
      type: NOTIFICATION_CHANGE,
      payload: { frequency, notification }
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
