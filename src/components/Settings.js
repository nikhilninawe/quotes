import React, { Component } from 'react';
import { Text, Switch, Picker } from 'react-native';
import { Card, CardSection } from './common/index';

class Settings extends Component {
    state = { notification: true, frequency: '3h' };    
    
    render() {
        return (
            <Card>
                <CardSection style={{ justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 30 }}> Notifications </Text>
                    <Switch
                         value={this.state.notification}
                         name="toggle-switch" 
                         onValueChange={() => this.setState({ notification: !this.state.notification })} 
                    />
                </CardSection>
                { this.state.notification && <CardSection style={{ justifyContent: 'space-between' }}>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.state.frequency}
                        onValueChange={(itemValue, itemIndex) => this.setState({ frequency: itemValue })}
                    >
                        <Picker.Item label="1 Hour" value="1h" />
                        <Picker.Item label="3 Hour" value="3h" />
                        <Picker.Item label="6 Hour" value="6h" />
                        <Picker.Item label="12 Hour" value="12h" />
                        <Picker.Item label="1 Day" value="24h" />
                    </Picker>
                </CardSection>
                }
            </Card>
        );
    }
}

export default Settings;

