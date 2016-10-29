import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Image,
  PanResponder
} from 'react-native';

import { observer } from 'mobx-react/native';

import Player from './player'

@observer(['gameManager'])
export default class PlayerPanel extends Component {


  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.{x,y}0 will be set to zero now
        this._previousLeft = this._previousLeft || this.props.gameManager.player.car.x;

      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        let newX = this._previousLeft + gestureState.dx;
        const { width: maxWidth } = this.props;
        newX =
          this._previousLeft + gestureState.dx < 0 ?
            0 :
            newX > maxWidth - 50 ?
              maxWidth - 50 :
                newX;
        this.props.gameManager.movePlayer(newX)
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this._previousLeft += gestureState.dx;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        this._previousLeft += gestureState.dx;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  componentDidMount(){
    this.props.gameManager.startGameLoop();
  }


  render(){
    const { player: { car: { x, rotate } } } = this.props.gameManager;
    return (
      <View style={[styles.container, { width: this.props.width }]} { ...this._panResponder.panHandlers }>
        <Player x={x} rotate={ rotate } {...this.props }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    bottom: 50
  }
});
