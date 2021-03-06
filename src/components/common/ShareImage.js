import React from 'react';
import {
TouchableOpacity,
View,
Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from '../../data/i18n';

const ShareImage = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={props.onPress}
            >
                <View style={styles.instructions}>
                    <Icon name="share" size={40} color={'green'} />
                    <Text style={{ marginTop: 10, marginLeft: 5, fontWeight: 'bold' }}>{I18n.t('share')}</Text>
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
        flexDirection: 'row'
    },
  };

export default ShareImage;   
