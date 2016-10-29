/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import BackgroundScreen from './widgets/background';
export default class Splash extends Component {

  componentDidMount(){
    setTimeout( () => this.props.navigator.replace({id:"home"}), 2000);
  }

  render() {
    return (
      <BackgroundScreen img={require('../assets/imgs/background.jpg')}>
        <View style={ styles.container }>
          <Text style={styles.welcome}>Wasteland Racing</Text>
        </View>
      </BackgroundScreen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
});

