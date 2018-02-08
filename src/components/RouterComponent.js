import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
import ControlPanel from './ControlPanel';
import MainContent from './MainContent';
import Settings from './Settings';
import AboutComponent from './AboutComponent';
import Language from './Language';
import { popupOpen } from '../actions/index';

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
              title="quotes"
              initial
            />

            <Scene
              onBack={() => Actions.main({ reload: true })}
              back
              key="language"
              component={Language}
              title="Language"
            />

            <Scene
              onBack={() => Actions.main({ reload: false })}
              back
              key="settings"
              component={Settings}
              title="Settings"
            />
            <Scene
              onBack={() => Actions.main({ reload: false })}
              back
              key="about"
              component={AboutComponent}
              title="About"
            />
          </Scene>
        </Router>
      );
    }
  }
  
  
export default connect(null, { popupOpen })(RouterComponent);

