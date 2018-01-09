import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ControlPanel from './ControlPanel';
import MainContent from './MainContent';
import FavoriteComponent from './FavoriteComponent';

const RouterComponent = () => {
    const menuIcon = (<Icon name="menu" size={30} />);
    const backIcon = (<Icon name="arrow-back" size={30} />);
    return (
      <Router sceneStyle={{ paddingTop: 20 }}>
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
            onLeft={() => Actions.main()}
            drawerIcon={backIcon}
            key="favourite"
            component={FavoriteComponent}
            title="Favorites"
          />

          <Scene
              onLeft={() => Actions.main()}
              drawerIcon={backIcon}
              key="settings"
              component={FavoriteComponent}
              title="Settings"
          />
        </Scene>
      </Router>
    );
  };
  
  
export default RouterComponent;

