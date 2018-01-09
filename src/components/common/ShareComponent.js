import React from 'react';
import {
    TouchableOpacity,
    View,
    Share
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ShareComponent = (props) => {
  const shareTextWithTitle = () => {
    Share.share({
      message: `${props.quote.quote} - ${props.quote.author}`,
      title: `Quote by ${props.quote.author}`
    }, {
      dialogTitle: 'Share quotes via',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter',
        'com.apple.uikit.activity.mail'
      ],
      tintColor: 'green'
    })
    .then(showResult)
    .catch(err => console.log(err));
  };

  const showResult = (result) => {
    console.log(result);
  };

  return (
      <View style={styles.container}>
        <TouchableOpacity 
            onPress={shareTextWithTitle}
        >
            <View style={styles.instructions}>
               <Icon name="share" size={50} color={'green'} />
            </View>
        </TouchableOpacity>
      </View>
  );
};

const styles = {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    instructions: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 20
    },
  };

export { ShareComponent };
