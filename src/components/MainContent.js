import React, { Component } from 'react';
import { View, TouchableOpacity, CameraRoll, Text, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import Share from 'react-native-share';
import BackgroundJob from 'react-native-background-job';
import uuid from 'react-native-uuid';
import gql from 'graphql-tag';
import { captureRef } from 'react-native-view-shot';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import ShareImage from './common/ShareImage';
import GoogleAd from './GoogleAd';
import SnapCarousel from './SnapCarousel';
import { PopupQuote } from './PopupQuote';
import { CardSection, Spinner } from './common/index';
import { userAction, userIdAction, popupClose, popupOpen,
  loadNotificationSetting,
   autoplay } from '../actions/index';
import client from './ApolloClient';
import languageJobs from './utils/LanguageJobs';

const adsQuery = gql`
  query getQuotes {
    allQuotes {
      id
      author
      language
      quoteId
      text
    }
  }`;

const createSpamQuoteMutation = gql`
  mutation ($feedback: String!, $quoteUrl: String!,
   $language: String!, $approved: String!, $userId: String!){
    createSpamQuote(feedback: $feedback,
     quoteUrl: $quoteUrl,
     language: $language,
     approved: $approved,
     userId: $userId
     ) {
      id
      quoteUrl
      feedback
    }
 }
`;

class MainContent extends Component {

    componentWillMount() {
      PushNotification.configure({
          popInitialNotification: false,
          onNotification: (notification) => {
              this.props.popupOpen(notification.message);
          }
        });

      AsyncStorage.getItem('notification').then((notification) => {
        if (notification === undefined || notification == null) {
          this.props.loadNotificationSetting(true, '3');
        } else if (JSON.parse(notification)) {
          AsyncStorage.getItem('frequency').then((frequency) => {
            this.props.loadNotificationSetting(true, frequency);
          }).done();
        } else {
          this.props.loadNotificationSetting(false, '3');
        }
      }).done();

      AsyncStorage.getItem('autoplay').then((autoplayEnabled) => {
        if (autoplayEnabled === undefined || autoplayEnabled == null) {
          this.props.autoplay(false, '30');
        } else if (JSON.parse(autoplayEnabled)) {
          AsyncStorage.getItem('autoplayInterval').then((interval) => {
            this.props.autoplay(true, interval);
          });
        } else {
          this.props.autoplay(false, '30');
        }
      }).done();

      AsyncStorage.getItem('userId').then((userId) => {
        let dbUserId = userId;
        if (!dbUserId) {
          dbUserId = uuid.v1();
        }
        this.props.userIdAction(dbUserId);
      }).done();
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
                    Toast.show('Successfully saved quote to Gallery', Toast.LONG);
                })
                .catch(() => { this.props.userAction('save_end'); });
            },
            error => console.error('Oops, snapshot failed', error)
        );
    }

    markSpam() {
      console.log(`Marked spam ${this.props.quote.quoteUrl}`);
      Toast.show('Thank you for providing feedback. We will incorporate it soon.', Toast.LONG);
      // client.query({
      //     query: adsQuery
      // }).then((resp) => {
      //   console.log(resp);
      // });
      if (this.props.userId === '06afd4d0-08cb-11e8-ab8d-f10cc168f13f' ||
         this.props.userId === '5ad27970-09af-11e8-8478-5f1eb56fc221') {
        console.log('Admin User');
      }
      client.mutate({
        mutation: createSpamQuoteMutation,
        variables: {
          feedback: 'Test Feedback',
          quoteUrl: this.props.quote.quoteUrl,
          language: this.props.language,
          approved: 'No',
          userId: this.props.userId
        }
      }).then((resp) => {
        console.log(resp);
      });
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

    renderSpam() {
      return (
        <Icon.Button name="report" backgroundColor="indianred" onPress={this.markSpam.bind(this)}>
          Mark Spam
        </Icon.Button>
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
                    {this.renderSave()}
                    {this.renderSpam()}
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
      quoteToShow: state.popup.quoteToShow,
      language: state.quote.language,
      userId: state.action.userId
     };
  };

export default connect(mapStateToProps,
  { userAction,
    popupClose,
    popupOpen,
    autoplay,
    loadNotificationSetting,
    userIdAction })(MainContent);
