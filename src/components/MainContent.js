import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import Share from 'react-native-share';
import BackgroundJob from 'react-native-background-job';
import { captureRef } from 'react-native-view-shot';
import ShareImage from './common/ShareImage';
import GoogleAd from './GoogleAd';
import SnapCarousel from './SnapCarousel';
import { PopupQuote } from './PopupQuote';
import quotes from '../actions/quotes.json';

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
            message: `${quotes.quotes[randomQuote].quote} \n-${quotes.quotes[randomQuote].author}`,
            date: nextTime,
        });
    }
};

BackgroundJob.register(backgroundJob);

class MainContent extends Component {
    state = { showModal: false, quoteToShow: '' };    

    componentDidMount() {
        PushNotification.configure({
            popInitialNotification: false,            
            onNotification: (notification) => {
                this.setState({ showModal: true, quoteToShow: notification.message });
            }    
        });
    }
    
    onDecline() {
        this.setState({ showModal: false });
    }

    onPress() {
        captureRef(this.refs.carousel, {
            format: 'png',
            quality: 0.5,
            result: 'data-uri'
          })
          .then(
            uri => {
                    const shareImageBase64 = {
                        message: `${this.props.quote.quote} \n -${this.props.quote.author}`,
                        title: `Quote by ${this.props.quote.author}`,
                        url: uri,
                        subject: 'Inspirational Quote',
                        snapshotContentContainer: true
                    };
                    Share.open(shareImageBase64);
            },
            error => console.error('Oops, snapshot failed', error)
        );
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 20, justifyContent: 'space-between' }} >
                <View collapsable={false} ref="carousel" style={{ flex: 1 }}>
                    <SnapCarousel reload={this.props.reload} /> 
                </View>        
                <ShareImage onPress={this.onPress.bind(this)} />
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
     };
  };

export default connect(mapStateToProps, { })(MainContent);
  
