import { observable, action, computed, autorun } from 'mobx';
import { InteractionManager } from 'react-native';
export default class GameManager {

  constructor(dimensions){
    this.dimensions = {
      width: dimensions.width,
      height: dimensions.height - 100
    }
  }

  @observable
  gameState = {
    over: false,
    idle: true,
    score: 0,
    health: 100,
    gasoline: 100,
    speed: 1,
    startTime: 0,
    elapsedTime: 0,
    generatorTicks: 0,
    bumpy: false
  };


  @observable
  dimensions = {
    width: 0,
    height: 0
  };

  @observable
  levelCount = 0;

  @observable
  player = {
    bumpFactor: 4,
    car: {
      x: 0,
      y: 0,
      rotate: 0
    },
    ball: {
      x: 0,
      y: 0,
      speedX: 0,
      speedY: 0
    }
  }

  @action
  movePlayer(x){
    this.player.car.x = x;
  }

  @action
  bounce(xVector, yVector){
    cancelAnimationFrame(this.raf);
  }

  @action
  startGameLoop(){
    this.gameState.idle = false;
    this.gameState.startTime = new Date().getTime();
    this.raf = requestAnimationFrame(() => {this.update()});
  }

  update(){
    this.raf = requestAnimationFrame(() => {this.update()});
    this.gameState.elapsedTime = new Date().getTime() - this.gameState.startTime;
    this.gameState.gasoline = this.gameState.gasoline - 0.05;
    this.bumpyPlayer();
    this.spriteGenerate();
    this.spriteMove();
    this.checkCollision();
    this.checkHealth();
  }

  checkHealth(){
    if (this.gameState.health <= 0){
      this.gameOver();
    }
  }

  gameOver(){
    this.gameState.over = true;
    cancelAnimationFrame(this.raf);
  }

  //
  // checkRightEdge(x, y, colliderX, height, colliderY, callback = () => {}){
  //   if (x > colliderX && y > colliderY && y < colliderY + height){
  //     this.bounce(-1, this.player.ball.speedY)
  //     callback();
  //   }
  // }
  //
  // checkLeftEdge(x, y, colliderX,  height, colliderY, callback = () => {}){
  //   if (x < colliderX && y > colliderY && y < colliderY + height){
  //     this.bounce(1, this.player.ball.speedY)
  //     callback();
  //   }
  // }
  //
  // checkTopEdge(x, y, colliderX, width, colliderY, callback = () => {}){
  //   if (y > colliderY && x > colliderX && x < colliderX + width) {
  //     this.bounce(this.player.ball.speedX, -1)
  //     callback();
  //   }
  // }
  //
  // checkBottomEdge(x, y, colliderX, width, colliderY, callback = () => {}){
  //   if (y < colliderY && x > colliderX && x < colliderX + width) {
  //     this.bounce(this.player.ball.speedX, 1)
  //     callback();
  //   }
  // }
  //


  // checkBrickCollision(brick, index){
  //   const { x, y} = this.player.ball;
  //   const { x: brickX, y: brickY, width, height, type } = brick;
  //   this.checkTopEdge(x, y, brickX, width, brickY - height, this.updateBrick.bind(this, type, index));
  //   if (y > brickY) {
  //     this.checkBottomEdge(x, y, brickX, width, brickY, this.updateBrick.bind(this, type, index));
  //   }
  //   this.checkRightEdge(x, y, brickX + width, - height, brickY, this.updateBrick.bind(this, type, index));
  //   this.checkLeftEdge(x, y, brickX, - height, brickY, this.updateBrick.bind(this, type, index));
  // }


  checkOffRoad(){
    const { car: { x } } = this.player;
    if (x < this.dimensions.width / 2 - 150 || x > this.dimensions.width / 2){
      this.gameState.bumpy = true;
      this.gameState.health = this.gameState.health - 0.5;
    } else {
      this.gameState.bumpy = false;
      this.player.car.rotate = 0;
    }
  }

  bumpyPlayer(){
    this.player.bumpFactor = this.player.bumpFactor * -1;
    this.player.car.rotate = this.player.car.rotate + this.player.bumpFactor;
  }

  checkCollision(){
    this.checkOffRoad();
    this.spriteMatrix.map(sprite => {
      if (sprite.top > this.dimensions.height - 150 && sprite.top < this.dimensions.height && sprite.x > this.player.car.x && sprite.x < this.player.car.x + 100 ) {
        this.gameState.bumpy = true;
        this.gameState.health = this.gameState.health - sprite.damage;
        this.gameState.gasoline = this.gameState.gasoline + sprite.gas < 100 ? this.gameState.gasoline + sprite.gas : 100
      }
    })
  }

  spriteList = [
    {
      image: require('../assets/imgs/dirt_large.png'),
      damage: 1,
      gas: 0
    },
    {
      image: require('../assets/imgs/dirt_large.png'),
      damage: 1,
      gas: 0
    },
    {
      image: require('../assets/imgs/dirt_large.png'),
      damage: 1,
      gas: 0
    },
    {
      image: require('../assets/imgs/dirt_large.png'),
      damage: 1,
      gas: 0
    },
    {
      image: require('../assets/imgs/dirt_large.png'),
      damage: 1,
      gas: 0
    },
    {
      image: require('../assets/imgs/dirt_large.png'),
      damage: 1,
      gas: 0
    }
  ]


  @observable
  spriteMatrix = [];

  spriteGenerate(){
    if (this.gameState.elapsedTime / 3000 / this.gameState.speed > this.gameState.generatorTicks + 1){
      spriteLocation = Math.floor(Math.random() * 24);
      spriteIndex = Math.floor(Math.random() * 6);
      this.gameState.generatorTicks = this.gameState.generatorTicks + 1;
      this.spriteMatrix.push({
        ...this.spriteList[spriteIndex],
        ...{
          x: spriteLocation * Math.floor(this.dimensions.width / 24),
          top: 0
        }
      });
    }
  }

  spriteMove(){
    console.log(this.spriteMatrix.length);
    this.spriteMatrix = this.spriteMatrix.map((sprite, index) => {
      sprite.top = sprite.top + 5 * this.gameState.speed;
      if (sprite.top > this.dimensions.height){
        return false
      } else {
        return sprite;
      }
    }).filter(sprite => sprite);
  }

  @action
  setInitialPosition(){
    this.player.car.x = this.dimensions.width / 2 - 80;
    this.player.ball.x = this.dimensions.width / 2 - 10;
  }

  @action
  startGame(){
    this.levelCount = 1;
  }
}
