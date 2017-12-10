// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';
import Hamburger from 'react-native-hamburger';


// Make a component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <View style={{ paddingLeft: 10 }}>
        <Hamburger active={false} />
      </View>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    // justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    // paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    flexDirection: 'row'    
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 70
  }
};

// Make the component available to other parts of the app
export { Header };
