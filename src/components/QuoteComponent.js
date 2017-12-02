import React from 'react';
import { Text } from 'react-native';

import { CardSection, Card } from './common';

const QuoteCmp = ({ text, author }) => {
    return (
        <Card>
            <CardSection style={{ borderBottomWidth: 0 }}>
                <Text style={style.textStyle}> {text} </Text>
            </CardSection>
            <CardSection style={{ borderBottomWidth: 0, justifyContent: 'flex-end' }}>
                <Text style={style.authorStyle}> -{author} </Text>
            </CardSection>
        </Card>
    );
};

const style = {
    textStyle: {
      fontSize: 32,
      fontStyle: 'italic',
      // flexWrap: 'wrap',
      fontWeight: 'bold',
      flex: 1
    },
    authorStyle: {
        fontSize: 20
    }
  };

export default QuoteCmp; 
