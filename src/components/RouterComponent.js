import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PushNotification from 'react-native-push-notification';
import BackgroundJob from 'react-native-background-job';
import { getLanguages } from 'react-native-i18n';
import { connect } from 'react-redux';
import ControlPanel from './ControlPanel';
import MainContent from './MainContent';
import Settings from './Settings';
import AboutComponent from './AboutComponent';
import Language from './Language';
import { popupOpen } from '../actions/index';
import I18n from '../data/i18n';
import languageJobs from './utils/LanguageJobs';

getLanguages().then(languages => {
  console.log(languages); // ['en-US', 'en']
});

class RouterComponent extends Component {

    componentWillMount() {
      PushNotification.popInitialNotification(notification => {
        if (notification) {
          this.props.popupOpen(notification.message);
        } else {
          console.log('Initial notification is null');
        }
      });
    }

    componentWillReceiveProps(nextProps) {
      BackgroundJob.cancelAll();
      if (nextProps.notification) {
        console.log(
          `Scheduling Push notification for ${nextProps.language} with frequency ${nextProps.frequency}`
        );

        BackgroundJob.schedule({
          jobKey: `myJob-${nextProps.language}`,
          period: nextProps.frequency * 60 * 60 * 1000,
          timeout: 10000,
          allowExecutionInForeground: true
        });
      } else {
        PushNotification.cancelAllLocalNotifications();
      }
    }

    render() {
      const menuIcon = (<Icon name="menu" size={30} />);
      return (
        <Router sceneStyle={{ paddingTop: 5 }}>
          <Scene
            key='drawer'
            drawer
            contentComponent={ControlPanel}
            hideBackImage
            drawerIcon={menuIcon}
            hideNavBar
            initial
          >
            <Scene
              key="main"
              component={MainContent}
              title={I18n.t('quotes')}
              initial
            />

            <Scene
              onBack={() => Actions.main({ reload: true })}
              back
              key="language"
              component={Language}
              title={I18n.t('language')}
            />

            <Scene
              onBack={() => Actions.main({ reload: false })}
              back
              key="settings"
              component={Settings}
              title={I18n.t('settings')}
            />
            <Scene
              onBack={() => Actions.main({ reload: false })}
              back
              key="about"
              component={AboutComponent}
              title={I18n.t('about')}
            />
          </Scene>
        </Router>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    language: state.quote.language,
    notification: state.notification.notification,
    frequency: state.notification.frequency,
  };
};
  
export default connect(mapStateToProps, { popupOpen })(RouterComponent);

