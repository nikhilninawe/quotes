import React, { Component } from 'react';
import { View, TouchableOpacity, CameraRoll, Text } from 'react-native';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import Share from 'react-native-share';
import BackgroundJob from 'react-native-background-job';
import { captureRef } from 'react-native-view-shot';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import ShareImage from './common/ShareImage';
import GoogleAd from './GoogleAd';
import SnapCarousel from './SnapCarousel';
import { PopupQuote } from './PopupQuote';
import quotes from '../actions/quotes.json';
import { CardSection, Spinner } from './common/index';
import { userAction, popupClose, popupOpen } from '../actions/index';

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
            smallIcon: 'ic_notification',
            largeIcon: 'ic_launcher'
        });
    }
};

BackgroundJob.register(backgroundJob);

class MainContent extends Component {

    componentWillMount() {
        PushNotification.configure({
            popInitialNotification: false,
            onNotification: (notification) => {
                this.props.popupOpen(notification.message);
        } });
    }

    onDecline() {
        this.props.popupClose();
    }

    onPress() {
        this.props.userAction('share_start');
        captureRef(this.refs.carousel, {
            format: 'png',
            quality: 0.5,
            result: 'data-uri'
          })
          .then(
            uri => {
                    this.props.userAction('share_end');
                    const shareImageBase64 = {
                        // message: `${this.props.quote.quote} \n -${this.props.quote.author}`,
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

    onSave() {
        this.props.userAction('save_start');
        captureRef(this.refs.carousel, {
            format: 'png',
            quality: 0.5,
            result: 'tmpfile'
          })
          .then(
            uri => {
                console.log(`Saving image to Gallery ${uri}`);
                CameraRoll.saveToCameraRoll(uri, 'photo')
                .then((successful) => {
                    console.log(`Save successful ${successful}`);
                    this.props.userAction('save_end');
                    Toast.show('Successfully saved quote to Gallery', 10);
                })
                .catch(() => { this.props.userAction('save_end'); });
            },
            error => console.error('Oops, snapshot failed', error)
        );
    }

    renderSave() {
        if (this.props.saveStarted) {
            return (
            <View>
                <Spinner size="large" />
            </View>
        );
        }
        return (
            <TouchableOpacity
               onPress={this.onSave.bind(this)}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="save" size={40} />
                    <Text style={{ marginTop: 10, marginLeft: 5, fontWeight: 'bold' }}>Save</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderShare() {
        if (this.props.shareStarted) {
            return (
            <View>
                <Spinner size="large" />
            </View>
        );
        }
        return (
            <ShareImage onPress={this.onPress.bind(this)} />
        );
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 20, justifyContent: 'space-between' }} >
                <View collapsable={false} ref="carousel" style={{ flex: 1 }}>
                    <SnapCarousel reload={this.props.reload} />
                </View>
                <CardSection style={{ justifyContent: 'space-around' }}>
                    {this.renderShare()}
                    {/* <Icon name="favorite" size={40} color='pink' />     */}
                    {this.renderSave()}
                </CardSection>
                <GoogleAd />
                {this.props.popupActive &&
                    <PopupQuote
                        visible
                        onClose={this.onDecline.bind(this)}
                    >
                {this.props.quoteToShow}
                </PopupQuote>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      quote: state.quote.currentQuote,
      saveStarted: state.action.saveActive,
      shareStarted: state.action.shareStarted,
      popupActive: state.popup.active,
      quoteToShow: state.popup.quoteToShow
     };
  };

export default connect(mapStateToProps,
  { userAction, popupClose, popupOpen })(MainContent);
