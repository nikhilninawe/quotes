import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ControlPanel from './ControlPanel';
import MainContent from './MainContent';
import FavoriteComponent from './FavoriteComponent';
import Settings from './Settings';
import AboutComponent from './AboutComponent';

const RouterComponent = () => {
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
            title="Inspirational Quotes"
            initial
          />
  
          <Scene
            onBack={() => Actions.main({ reload: false })}
            back
            key="favourite"
            component={FavoriteComponent}
            title="Favorites"
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
  };
  
  
export default RouterComponent;

