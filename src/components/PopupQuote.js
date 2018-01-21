import React from 'react';
import { Text, View, ImageBackground, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ShareComponent } from './common/index';

const PopupQuote = ({ children, visible = false, onClose }) => {
    const quoteSplit = children.split('-');
    return (      
      <Modal
        style={[styles.modal3]}
        position={'center'}
        isOpen={visible}
        backdropPressToClose={false}
        swipeToClose={false}
      >
        {/* <View style={containerStyle}> */}
          <ScrollView style={{ minHeight: 400 }}> 
            <TouchableWithoutFeedback>
                <ImageBackground
                  source={{ uri: 'https://s3.ap-south-1.amazonaws.com/quotes2.4/leather.jpg' }}
                  style={{ width: 350 }}          
                >
                  <View style={{ alignItems: 'flex-end' }}>
                    <Icon name="close" size={30} onPress={onClose} alignSelf={'right'} />
                  </View>
                  <Text style={styles.text}>{quoteSplit[0]}</Text>
                  <Text style={styles.author}>-{quoteSplit[1]}</Text>
                </ImageBackground>
              </TouchableWithoutFeedback>
            
            <View style={{ justifyContent: 'center', height: 60 }} >
                <ShareComponent quote={{ quote: quoteSplit[0], author: quoteSplit[1] }} />
            </View>
          </ScrollView>
        {/* </View> */}
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
    maxHeight: 400,
    width: 350
  },
  text: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    minHeight: 250,
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
