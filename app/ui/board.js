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
  ScrollView,
  View
} from 'react-native';
import BackgroundScreen from './widgets/background';
import PlayerPanel from './widgets/playerPanel';
import Level from './level';
import {observer} from 'mobx-react/native';

class Board extends Component {

  constructor(){
    super();
  }

  componentDidMount(){
    // this.props.gameManager.setColliderFrame()
  }

  render() {
    const { levelCount, gameState: { over: gameOver, health, gasoline }, dimensions: { width: screenWidth, height: screenHeight } } = this.props.gameManager;
    return (
      <BackgroundScreen>
        { gameOver ?
          <View style={{ position: 'absolute', width: screenWidth, height: screenHeight, flex: 1, justifyContent: 'center', alignItems: 'center', transform: [{ 'translate':[0,0,2] }] }}>
            <Text style={{ color: 'white', fontSize: 40 }}>Game Over</Text>
          </View> : false
        }
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>
              {` Welcome to Level ${levelCount} `}
            </Text>
          </View>
          <View>
              <View width={screenWidth} height={screenHeight}>
                <Level width={screenWidth} height={screenHeight - 50} gameManager={this.props.gameManager}/>
                <PlayerPanel width={screenWidth} {...this.props} />
              </View>
          </View>
          <View style={ [styles.uiLayer, { width: screenWidth }] }>
            <View style={ styles.uiGroup }>
              <View style={ styles.health }>
                <View style={ [ styles.redHealth, { width: health, backgroundColor: 'red' } ]}/>
                <View style={ [ styles.grayHealth, { width: 100 - health } ]}/>
              </View>
            </View>
            <View style={ styles.uiGroup }>
              <View style={ styles.health }>
                <View style={ [ styles.redHealth, { width: gasoline, backgroundColor: 'orange' } ]}/>
                <View style={ [ styles.grayHealth, { width: 100 - gasoline } ]}/>
              </View>
            </View>
          </View>
      </BackgroundScreen>
    );
  }
}

const styles = StyleSheet.create({
  welcomeContainer: {
    height: 50,
    marginTop: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  uiLayer: {
    position: 'absolute',
    top: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uiGroup: {
    flex: 1,
    flexDirection: 'column'
  },
  health: {
    width: 100,
    bottom: 30,
    marginTop: 20,
    marginLeft: 20,
    height: 10,
  },
  grayHealth : {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'gray',
    height: 6,
  },
  redHealth: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 6,
  }
});

export default observer(['gameManager'])(Board)

