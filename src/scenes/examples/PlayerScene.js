import Player from '../../sprites/player/Player';

class PlayerScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayerScene' })

    this.player = null
  }

  preload() {
    this.load.atlas('player', './assets/images/character.png', './assets/images/character.json');
  }

  create() {
    this.player = new Player({
      scene: this,
      key: 'player',
      x: this.game.config.width / 2,
      y: this.game.config.height / 2 - 150
    })
    this.player.scaleX = 4
    this.player.scaleY = 4

    this.player2 = new Player({
      scene: this,
      key: 'player',
      x: this.game.config.width / 2 - 100,
      y: this.game.config.height / 2 - 130
    })
  }

  update() {
    this.player.update();
    this.player2.update();
  }
}

export default PlayerScene
