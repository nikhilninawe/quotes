import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Rate from 'react-native-rate';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CardSection } from './common/index';
import I18n from '../data/i18n';

class ControlPanel extends Component {
  
    render() {
        const homeIcon = (<Icon name="home" size={30} color='green' />);  
        // const favouriteIcon = (<Icon name="favorite" size={30} color='pink' />);
        const starIcon = (<Icon name="star" size={25} color='black' />);  
        const infoIcon = (<Icon name="info" size={25} color='black' />);
        const settingsIcon = (<Icon name="settings" size={30} />);

        const languageIcon = (<Icon name="language" size={30} color='blue' />);
      const options = {
          AppleAppID: '2193813192',
          GooglePackageName: 'com.nikhilninawe.quotes',
          AmazonPackageName: 'com.nikhilninawe.quotes',
          preferGoogle: true,
          preferInApp: false
        };    
        return (
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
            <View>
              <CardSection style={{ backgroundColor: 'black', marginBottom: 20, justifyContent: 'center' }}>
                <Text style={{ fontSize: 40, color: 'white' }}>{I18n.t('quotes')}</Text>
              </CardSection>
              <CardSection style={{ borderColor: 'white' }}>
                {homeIcon}
                <Text onPress={Actions.main} style={{ fontSize: 25, paddingLeft: 30 }}>{I18n.t('home')}</Text>
              </CardSection>
               { <CardSection style={{ borderColor: 'white' }}>
                {languageIcon}
                <Text onPress={Actions.language} style={{ fontSize: 25, paddingLeft: 30 }}>{I18n.t('language')}</Text>
              </CardSection>
               }
              <CardSection style={{ borderColor: 'white' }}>
                {settingsIcon}
                <Text onPress={Actions.settings} style={{ fontSize: 25, paddingLeft: 30 }}>{I18n.t('settings')}</Text>
              </CardSection>
            </View>
            <View>
              <View
                  style={{
                    borderBottomColor: 'silver',
                    borderBottomWidth: 1,
                  }}
              />
              <CardSection style={{ borderColor: 'white' }}>
                {starIcon}
                <Text onPress={() => Rate.rate(options, () => {})} style={{ fontSize: 20, paddingLeft: 15, marginBottom: 5 }}>{I18n.t('rate')}</Text>
              </CardSection>
              <CardSection style={{ borderColor: 'white' }}>
                {infoIcon}
                <Text onPress={Actions.about} style={{ fontSize: 20, paddingLeft: 15 }}>{I18n.t('about')}</Text>
              </CardSection>
            </View>  
        </View>
    );
    }
}

export default ControlPanel;
