import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { CardSection } from './common/index';


class AboutComponent extends Component {
    render() {
        const url = 'http://nikhilninawe.blogspot.com/2017/11/privacy-policy.html';
        return (
            <View style={{ paddingTop: 20, flex:1, maxHeight: 150, justifyContent: 'space-around' }}>
                <CardSection style={{ flexDirection: 'column', justifyContent: 'space-between', height: 70, paddingBottom: 5 }}>
                     <Text style={{ fontSize: 25 }}> Build version </Text>
                     <Text style={{ paddingLeft: 7, fontSize: 20 }}>2.5</Text>
                </CardSection>

                <CardSection>
                     <Text 
                     style={{ fontSize: 25 }}
                     onPress={() => Linking.openURL(url).catch(err => console.error('An error occurred', err))} 
                     >
                          Privacy Policy
                     </Text>
                </CardSection>
            </View>
        );
    }
}

export default AboutComponent;

