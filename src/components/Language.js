import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import { connect } from 'react-redux';
import { languageChange } from '../actions/index';

const languages =
  [{
    label: 'English',
    value: 'en'
  },
  {
    label: 'हिंदी',
    value: 'hi'
  },
  {
    label: 'русский',
    value: 'ru'
  },
  {
   label: 'मराठी',
   value: 'mr'
  }
];

class Language extends Component {
  state = { language: [languages[0]] }

  componentWillMount() {
    AsyncStorage.getItem('language').then((language) => {
      if (!language) {
        this.setState({ language: [languages[0]] });
      } else {
        this.setState({ language: [JSON.parse(language)] });
      }
    }).done();
  }

  onSelectionsChange = (language) => {
    let newLang = [];
    if (language.length === 0) {
      newLang = [languages[0]];
    } else if (language.length === 1) {
      newLang = language;
    } else {
      newLang = [language[1]];
    }
    this.setState({ language: newLang });
    this.props.languageChange(newLang[0]);
    AsyncStorage.setItem('language', JSON.stringify(newLang[0]));
  }

  render() {
    return (
      <View style={{ paddingTop: 20 }}>
        <SelectMultiple
          items={languages}
          selectedItems={this.state.language}
          onSelectionsChange={this.onSelectionsChange}
          labelStyle={{ fontSize: 25, paddingLeft: 10 }}
        />
      </View>
    );
  }
}

export default connect(null, { languageChange })(Language);
