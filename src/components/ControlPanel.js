import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { changeHamburgerStatus } from '../actions/index';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class ControlPanel extends Component {
    render() {
        return (
      <View style={{ backgroundColor: 'white', height: viewportHeight, paddingTop: 75 }}>
        <ScrollView>
          <Text onPress={this.props.changeHamburgerStatus} style={{ fontSize: 25 }}>Home</Text>
          <Text style={{ fontSize: 25 }}>Favourites</Text>
        </ScrollView>
      </View>
    );
    }
}

export default connect(null, { changeHamburgerStatus })(ControlPanel);
