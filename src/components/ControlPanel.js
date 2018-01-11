import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CardSection } from './common/index';

class ControlPanel extends Component {
  
    render() {
        const homeIcon = (<Icon name="home" size={30} color='green' />);    
        const favouriteIcon = (<Icon name="favorite" size={30} color='pink' />);  
        const settingsIcon = (<Icon name="settings" size={30} />);          
        return (
        <View>
              <CardSection style={{ backgroundColor: 'slategray', marginBottom: 20 }}>
                <Text style={{ fontSize: 40 }}>quotes</Text>
              </CardSection>
              <CardSection style={{ borderColor: 'white' }}>
                {homeIcon}
                <Text onPress={Actions.main} style={{ fontSize: 25, paddingLeft: 30 }}>Home</Text>
              </CardSection>
              {/* <CardSection style={{ borderColor: 'white' }}>
                {favouriteIcon}
                <Text onPress={Actions.favourite} style={{ fontSize: 25, paddingLeft: 30 }}>Favorites</Text>
              </CardSection> */}
              <CardSection style={{ borderColor: 'white' }}>
                {settingsIcon}
                <Text onPress={Actions.settings} style={{ fontSize: 25, paddingLeft: 30 }}>Settings</Text>
              </CardSection>
        </View>
    );
    }
}

export default ControlPanel;
