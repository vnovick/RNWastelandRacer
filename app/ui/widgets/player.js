import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';


export default class Player extends Component {

  componentDidMount(){
    this.props.gameManager.setInitialPosition();
  }

  render(){
    return (
        <View style={{ left: this.props.x }} ref={(b) => this.player = b}>
          <Image source={ require('../../assets/imgs/carsmall.png')} style={ [styles.player, {
            transform: [{rotate: `${ 90 + this.props.rotate }deg` }],
          }] }/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  player: {
    width: 150,
    height: 80,
  }
});
