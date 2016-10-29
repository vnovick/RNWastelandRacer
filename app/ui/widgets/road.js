import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';

import { observer } from 'mobx-react/native';


@observer(['gameManager'])
export default class Road extends Component {

  render(){
    const { dimensions: { height, width } } = this.props.gameManager;
    return (
      <View>
        <Image source={ require('../../assets/imgs/fallout_3_wasteland_road001.png')} style={[ styles.road, { height: height + 100, left: width / 2 - 100 }]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  road: {
    position: 'absolute',
    width: 200,
    top: 0
  },
  shield: {
    width: 50,
    height: 5,
    marginBottom: 5
  }
});
