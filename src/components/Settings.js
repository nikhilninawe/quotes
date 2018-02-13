import React, { Component } from 'react';
import { Text, Switch, Picker, AsyncStorage } from 'react-native';
import BackgroundJob from 'react-native-background-job';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
import { Card, CardSection } from './common/index';
import { notificationChange, autoplay, loadNotificationSetting } from '../actions/index';

class Settings extends Component {

    render() {
        return (
            <Card>
                <CardSection style={{ justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 30 }}> Quote Notifications </Text>
                    <Switch
                         value={this.props.notification}
                         name="toggle-switch"
                         onValueChange={(value) => {
                            AsyncStorage.setItem('notification', JSON.stringify(value));
                            this.props.notificationChange(value, this.props.frequency);
                        }}

                    />
                </CardSection>
                { this.props.notification && <CardSection style={{ justifyContent: 'space-between' }}>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.props.frequency}
                        onValueChange={(itemValue, itemIndex) => {
                            AsyncStorage.setItem('frequency', itemValue);
                            this.props.notificationChange(true, itemValue);
                        }}
                    >
                        <Picker.Item label="Every 1 Hour" value="1" />
                        <Picker.Item label="Every 3 Hours" value="3" />
                        <Picker.Item label="Every 6 Hours" value="6" />
                        <Picker.Item label="Every 12 Hours" value="12" />
                        <Picker.Item label="Once in a Day" value="24" />
                    </Picker>
                </CardSection>
                }
                <CardSection style={{ justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 30 }}> Refresh Quotes</Text>
                    <Switch
                         value={this.props.autoplayEnabled}
                         name="toggle-switch"
                         onValueChange={(value) => {
                            AsyncStorage.setItem('autoplay', JSON.stringify(value));
                            this.props.autoplay(value, this.props.autoplayInterval);
                        }}

                    />
                </CardSection>
                { this.props.autoplayEnabled && <CardSection style={{ justifyContent: 'space-between' }}>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.props.autoplayInterval}
                        onValueChange={(itemValue, itemIndex) => {
                            AsyncStorage.setItem('autoplayInterval', itemValue);
                            this.props.autoplay(true, itemValue);
                        }}
                    >
                        <Picker.Item label="Every 5 seconds" value="5" />
                        <Picker.Item label="Every 10 seconds" value="10" />
                        <Picker.Item label="Every 15 seconds" value="15" />
                        <Picker.Item label="Every 20 seconds" value="20" />
                        <Picker.Item label="Every 30 seconds" value="30" />
                        <Picker.Item label="Every minute" value="60" />

                    </Picker>
                </CardSection>
                }
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification.notification,
        frequency: state.notification.frequency,
        autoplayEnabled: state.notification.autoplayEnabled,
        autoplayInterval: state.notification.autoplayInterval
    };
};

export default connect(mapStateToProps,
  { notificationChange, autoplay, loadNotificationSetting })(Settings);
