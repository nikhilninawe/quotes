import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { CardSection } from './common/index';
import I18n from '../data/i18n';


class AboutComponent extends Component {
    render() {
        const url = 'http://nikhilninawe.blogspot.com/2017/11/privacy-policy.html';
        return (
            <View style={{ paddingTop: 20, paddingLeft: 10, paddingRight: 10, flex: 1, maxHeight: 150, justifyContent: 'space-around' }}>
                <CardSection style={{ flexDirection: 'column', justifyContent: 'space-between', height: 70, paddingBottom: 5 }}>
                     <Text style={{ fontSize: 25 }}> {I18n.t('build')} </Text>
                     <Text style={{ paddingLeft: 7, fontSize: 20 }}>4.0</Text>
                </CardSection>

                <CardSection>
                     <Text 
                     style={{ fontSize: 25 }}
                     onPress={() => Linking.openURL(url).catch(err => console.error('An error occurred', err))} 
                     >
                       {I18n.t('privacy')}
                     </Text>
                </CardSection>
            </View>
        );
    }
}

export default AboutComponent;

