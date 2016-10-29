import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

import { observer } from 'mobx-react/native';
import Road from './widgets/road';

@observer(['gameManager'])
export default class Level extends Component{

  gameObstacles(){
    return this.props.gameManager.spriteMatrix.map((sprite, index) => {
      return <Image key={ index } source={sprite.image} style={[ styles.sprite, { top: sprite.top, left: sprite.x }]}/>
    });
  }

  render(){
    const { width, height, gameManager: { bricks } } = this.props;
    return (
      <View style={{
        width, height
      }}>
        <Image source={require('../assets/imgs/DirtPathTerrainTexture1_zps556f6da6.jpg')} >
          { this.gameObstacles() }
          <Road {...this.props}/>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sprite: {
    position: 'absolute'
  }
});
