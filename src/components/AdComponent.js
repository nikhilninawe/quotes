import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { withNativeAd } from 'react-native-fbads';

// class AdComponent extends Component {

const AdComponent = withNativeAd(({ nativeAd }) => (
  // render() {
    // console.log("Xyz " + this.props);
    // return (
      <View style={style.containerStyle}>
        <Text> Someone here </Text>
        // <Text>{this.props.nativeAd.description}</Text>
      </View>
    // );
  // }
));

const style = {
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
}

export default AdComponent;
