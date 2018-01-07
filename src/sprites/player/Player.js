import SETTINGS from '../../config/Game';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    const { scene, x, y, key } = config;

    super(scene, x, y, key);

    // The animation initialization
    const animationConfig = {
      walkDown: {
        key: 'walk_down',
        frames: scene.anims.generateFrameNames('player', { prefix: 'walk_down_', end: 4, zeroPad: 4 }),
        frameRate: SETTINGS.FRAME_RATE,
        repeat: -1
      },
      walkUp: {
        key: 'walk_up',
        frames: scene.anims.generateFrameNames('player', { prefix: 'walk_up_', end: 4, zeroPad: 4 }),
        frameRate: SETTINGS.FRAME_RATE,
        repeat: -1
      },
      walkLeft: {
        key: 'walk_left',
        frames: scene.anims.generateFrameNames('player', { prefix: 'walk_left_', end: 4, zeroPad: 4 }),
        frameRate: SETTINGS.FRAME_RATE,
        repeat: -1
      },
      walkRight: {
        key: 'walk_right',
        frames: scene.anims.generateFrameNames('player', { prefix: 'walk_right_', end: 4, zeroPad: 4 }),
        frameRate: SETTINGS.FRAME_RATE,
        repeat: -1
      },
      swingDown: {
        key: 'swing_down',
        frames: scene.anims.generateFrameNames('player', { prefix: 'swing_down_', end: 4, zeroPad: 4 }),
        frameRate: SETTINGS.FRAME_RATE,
        repeat: -1
      },
      swingUp: {
        key: 'swing_up',
        frames: scene.anims.generateFrameNames('player', { prefix: 'swing_up_', end: 4, zeroPad: 4 }),
        frameRate: SETTINGS.FRAME_RATE,
        repeat: -1
      },
      swingLeft: {
        key: 'swing_left',
        frames: scene.anims.generateFrameNames('player', { prefix: 'swing_left_', end: 4, zeroPad: 4 }),
        frameRate: SETTINGS.FRAME_RATE,
        repeat: -1
      },
      swingRight: {
        key: 'swing_right',
        frames: scene.anims.generateFrameNames('player', { prefix: 'swing_right_', end: 4, zeroPad: 4 }),
        frameRate: SETTINGS.FRAME_RATE,
        repeat: -1
      }
    };

    Object.keys(animationConfig).forEach(key => {
      scene.anims.create(animationConfig[key]);
    });

    this.scaleX = 2
    this.scaleY = 2

    this.setInteractive();

    this.playerMatrix = [-1, 1, -1, 1];

    const me = this;

    // Input keys binding
    this.gameKeys = { special: ['SPACE'], attack: ['W', 'A', 'S', 'D'], move: ['UP', 'DOWN', 'LEFT', 'RIGHT'] };
    this.pollingKeys = ['W', 'A', 'S', 'D', 'UP', 'DOWN', 'LEFT', 'RIGHT', 'SPACE'];

    Object.keys(this.gameKeys).forEach(key => {
      this.gameKeys[key].forEach(inputKey => {
        me[`key${inputKey}`] = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[inputKey]);
      });
    });

    scene.make.text({
      x: 0,
      y: 0,
      text: 'Game00\n-',
      style: {
        font: '48px Arial',
        fill: '#ff00ff',
        align: 'center'
      }
    })

    this.lastAnimation = null;

    config.scene.add.existing(this)
  }

  update() {
    // An old un-closure method for this
    const me = this;

    const walk = this.gameKeys.move.find(key => me[`key${key}`].isDown);
    if (walk) {
      const vector = { UP: -1, DOWN: 1, LEFT: -1, RIGHT: 1 }[walk];

      const SPEE = (Math.random() * (1 - 2) + 1);

      if (walk === 'DOWN' || walk === 'UP') {
        this.y = this.y + vector * (SETTINGS.DEFAULT_SPEED + SPEE);
      } else {
        if (walk === 'LEFT' || walk === 'RIGHT') {
          this.x = this.x + vector * (SETTINGS.DEFAULT_SPEED + SPEE);
        }
      }

      this.anims.play(`walk_${walk.toLowerCase()}`, true);

      this.lastAnimation = walk;
    } else {
      const attack = this.gameKeys.attack.find(key => me[`key${key}`].isDown);
      if (attack) {
        const swingDirection = { W: 'up', A: 'left', S: 'down', D: 'right' }[attack];
        this.anims.play(`swing_${swingDirection}`, true);
        // Get last player's facing direction for a swing
        // const lastKey = this.lastAnimation ? this.lastAnimation.key : 'walk_down';
        this.lastAnimation = swingDirection;

        // this.anims.play(lastKey, true);
      }
    }
    // An attack animation
    // } else if (this.keySPACE.isDown) {
    //   // Get last player's facing direction for a swing
    //   const lastKey = this.lastAnimation ? this.lastAnimation.key : 'walk_down';
    //   const name = lastKey.split('_');

    //   // Swing in that direction
    //   this.anims.play(`swing_${name[1]}`, true);
    // }

    const allUp = this.pollingKeys.reduce((acc, value) => { return acc && me[`key${value}`].isUp }, true)

    if (allUp) {
      // Continue the swing animation
      if (this.anims.currentAnim && this.anims.currentAnim.key.startsWith('swing_') &&
        this.anims.currentFrame && !this.anims.currentFrame.isLast) {
        return;
      }

      // Reset to the initial facing position
      if (this.lastAnimation) {
        this.anims.play(`walk_${this.lastAnimation.toLowerCase()}`, false);
      }

      this.anims.stop();
    }
  }
}
