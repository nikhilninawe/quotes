import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import BackgroundJob from 'react-native-background-job';
import { Header, ShareComponent } from './common/index';
import GoogleAd from './GoogleAd';
import SnapCarousel from './SnapCarousel';
import { PopupQuote } from './PopupQuote';
import quotes from '../actions/quotes.json';
import { changeHamburgerStatus } from '../actions/index';

const backgroundJob = {
    jobKey: 'myJob',
    job: () => { 
        function getNextNotificationTime() {
            const nextNotifTime = new Date();
            nextNotifTime.setMinutes(nextNotifTime.getMinutes() + 1);        
            nextNotifTime.setSeconds(0);
            return nextNotifTime;
        }
        const nextTime = getNextNotificationTime();
        const randomQuote = Math.floor((Math.random() * quotes.quotes.length) - 1);   
        PushNotification.localNotificationSchedule({
            message: quotes.quotes[randomQuote].quote,
            date: nextTime,
        });
    }
};

BackgroundJob.register(backgroundJob);

class MainContent extends Component {
    state = { showModal: false, quoteToShow: '' };    
    componentWillMount() {
        
    }

    componentDidMount() {
        PushNotification.configure({
            popInitialNotification: false,            
            onNotification: (notification) => {
                this.setState({ showModal: true, quoteToShow: notification.message });
            }    
        });
        BackgroundJob.schedule({            
            jobKey: 'myJob',
            period: 3 * 60 * 60 * 1000,
            timeout: 10000,
            allowExecutionInForeground: true
        });       
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    onHamburgerPress() {
        this.props.changeHamburgerStatus();
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 20, justifyContent: 'space-between' }} >
                <Header headerText="Inspirational Quotes" hamburgerState={this.props.hamActive} onPress={this.onHamburgerPress.bind(this)} />
                <SnapCarousel />         
                <ShareComponent {...this.props} />
                <GoogleAd />
                <PopupQuote
                    visible={this.state.showModal}
                    onClose={this.onDecline.bind(this)}
                >
                {this.state.quoteToShow}
                 </PopupQuote>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
      quote: state.quote.currentQuote,
      hamActive: state.hamburger.active
     };
  };
  
export default connect(mapStateToProps, { changeHamburgerStatus })(MainContent);
  
