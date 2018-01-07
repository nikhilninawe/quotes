import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import { connect } from 'react-redux';
import MainContent from './MainContent';
import ControlPanel from './ControlPanel';

class Main extends Component {
    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                open={this.props.hamActive}
                side="left"
                type="overlay"
                openDrawerOffset={0.2} // 20% gap on the right side of drawer            
                content={<ControlPanel />}
                styles={drawerStyles}            
            >
                <MainContent />
            </Drawer>
        );
    }
}

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0, shadowRadius: 3 },
    main: { paddingLeft: 3 },
};

const mapStateToProps = (state) => {
    return {
         hamActive: state.hamburger.active  
    };
};

export default connect(mapStateToProps, {})(Main);
