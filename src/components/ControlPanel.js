import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { changeHamburgerStatus } from '../actions/index';
import { Card, CardSection } from './common/index';

class ControlPanel extends Component {
  
    render() {
        const homeIcon = (<Icon name="home" size={30} />);    
        const favouriteIcon = (<Icon name="favorite" size={30} />);  
        const settingsIcon = (<Icon name="settings" size={30} />);          
        return (
        <View style={{ paddingTop: 75 }}>
          <ScrollView>
            <Card>
              <CardSection>
                {homeIcon}
                <Text onPress={Actions.main} style={{ fontSize: 25 }}>Home</Text>
              </CardSection>
              <CardSection>
                {favouriteIcon}
                <Text onPress={Actions.favourite} style={{ fontSize: 25 }}>Favourites</Text>
              </CardSection>
              <CardSection>
                {settingsIcon}
                <Text onPress={Actions.settings} style={{ fontSize: 25 }}>Settings</Text>
              </CardSection>
            </Card>
          </ScrollView>
        </View>
    );
    }
}

export default connect(null, { changeHamburgerStatus })(ControlPanel);
