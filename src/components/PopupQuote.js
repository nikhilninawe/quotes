import React from 'react';
import { Text, View, ImageBackground, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Modal from 'react-native-modalbox';
import { CardSection } from './common/CardSection';
import { ShareComponent, Button, Card } from './common/index';

const PopupQuote = ({ children, visible = false, onClose }) => {
    const { containerStyle, textStyle, cardSectionStyle } = styles;
    return (      
      <Modal
        style={[styles.modal3]}
        position={'center'}
        isOpen={visible}
        backdropPressToClose={false}
        swipeToClose={false}
      >
        <View style={containerStyle}>
        <ScrollView> 
         <TouchableWithoutFeedback>
            <ImageBackground
            source={require('../assets/leather.jpg')}
            style={{ width: 350, height: 240 }}          
            >
              <Text style={styles.text}>{children}</Text>
              <Text style={styles.author}>-</Text>
             </ImageBackground>
            </TouchableWithoutFeedback>
          </ScrollView>
          <CardSection style={{ justifyContent: 'center', height: 60 }} >
              <View style={{ width: 120, paddingRight: 30 }}>
                <Button onPress={onClose}>Close</Button>
              </View>
              <ShareComponent quote={{ quote: children, author: '' }} />
          </CardSection>
        </View>
      </Modal>
    );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  constainerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modal3: {
    maxHeight: 300,
    width: 350
  },
  text: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    minHeight: 100,
    fontSize: 32,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },

  author: {
    textAlign: 'right',
    fontSize: 20,
    backgroundColor: 'transparent',
    paddingTop: 20,
    paddingBottom: 10
  },
};

export { PopupQuote };
