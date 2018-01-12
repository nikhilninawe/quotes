import React from 'react';
import {
TouchableOpacity,
View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ShareImage = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={props.onPress}
            >
                <View style={styles.instructions}>
                    <Icon name="share" size={40} color={'green'} />
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

export default ShareImage;   
