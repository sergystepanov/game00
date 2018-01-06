import 'phaser'

import BootScene from './scenes/Boot'
import PlayerScene from './scenes/examples/PlayerScene'

const { innerWidth: ww, innerHeight: wh } = window;

const GAME = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'content',
  width: ww,
  height: wh,
  scene: [
    BootScene,
    PlayerScene
  ],
  pixelArt: true
});
