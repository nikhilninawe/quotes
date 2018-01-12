import React, { Component } from 'react';
import { Text, Switch, Picker, AsyncStorage } from 'react-native';
import BackgroundJob from 'react-native-background-job';
import { connect } from 'react-redux';
import { Card, CardSection } from './common/index';
import { notificationChange, getSettingsFromDB } from '../actions/NotificationAction';

class Settings extends Component {
    
    componentWillMount() {
        AsyncStorage.getItem('notification').then((notification) => {
            if (notification === undefined || notification == null) {
                this.props.notificationChange(true, '3');
            } else if (JSON.parse(notification)) {
                AsyncStorage.getItem('frequency').then((frequency) => {
                    this.props.notificationChange(true, frequency);                    
                });
            } else {
                this.props.notificationChange(false, null);
            }
        }).done();
    }

    componentWillReceiveProps(nextProps) {
        this.applyNotificationChange(nextProps);
    }

    applyNotificationChange(nextProps) {
        BackgroundJob.cancel({ jobKey: 'myJob' });
        if (nextProps.notification) {
            console.log(`Scheduling myJob with frequency ${nextProps.frequency} hour(s)`);
            BackgroundJob.schedule({            
                jobKey: 'myJob',
                period: nextProps.frequency * 60 * 60 * 1000,
                timeout: 10000,
                allowExecutionInForeground: true
            });    
        } else {
            console.log('Not scheduling myJob');
        }
    }

    render() {
        return (
            <Card>
                <CardSection style={{ justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 30 }}> Notifications </Text>
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
                        <Picker.Item label="1 Hour" value="1" />
                        <Picker.Item label="3 Hours" value="3" />
                        <Picker.Item label="6 Hours" value="6" />
                        <Picker.Item label="12 Hours" value="12" />
                        <Picker.Item label="1 Day" value="24" />
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
        frequency: state.notification.frequency
    };
};

export default connect(mapStateToProps, { notificationChange, getSettingsFromDB })(Settings);

