import Player from '../../sprites/player/Player';

class PlayerScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayerScene' })

    this.player = null
  }

  preload() {
    this.load.atlas('player', './assets/images/character.png', './assets/images/character.json');
    this.load.atlas('fruits', './assets/veg.png', './assets/veg.json');
  }

  create() {
    // The grass
    for (var i = 0; i < 2000; i++) {
      var image = this.add.image(
        100 + Math.random() * 600, 100 + Math.random() * 400,
        'fruits', 'veg0' + Math.floor(1 + Math.random() * 9));
      image.depth = image.y;
    }

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

    this.player.depth = this.player.y + this.player.height;
    this.player2.depth = this.player2.y + this.player2.height / 2;
  }

  update() {
    this.player.update();
    this.player2.update();
  }
}

export default PlayerScene
