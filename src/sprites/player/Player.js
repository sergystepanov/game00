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

    this.setInteractive()
    this.downKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    this.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

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
    if (this.downKey.isDown) {
      this.y += SETTINGS.DEFAULT_SPEED;
      this.anims.play('walk_down', true);
      this.lastAnimation = this.anims.currentAnim;
    } else if (this.upKey.isDown) {
      this.y -= SETTINGS.DEFAULT_SPEED;
      this.anims.play('walk_up', true)
      this.lastAnimation = this.anims.currentAnim;
    } else if (this.leftKey.isDown) {
      this.x -= SETTINGS.DEFAULT_SPEED;
      this.anims.play('walk_left', true)
      this.lastAnimation = this.anims.currentAnim;
    } else if (this.rightKey.isDown) {
      this.x += SETTINGS.DEFAULT_SPEED;
      this.anims.play('walk_right', true)
      this.lastAnimation = this.anims.currentAnim;
      // An attack animation
    } else if (this.spaceKey.isDown) {
      // Get last player's facing direction for a swing
      const lastKey = this.lastAnimation ? this.lastAnimation.key : 'walk_down';
      const name = lastKey.split('_');

      // Swing in that direction
      this.anims.play(`swing_${name[1]}`, true);
    }

    if (this.downKey.isUp && this.upKey.isUp && this.leftKey.isUp && this.rightKey.isUp) {
      // Continue the swing animation
      if (this.anims.currentAnim && this.anims.currentAnim.key.startsWith('swing_') &&
        this.anims.currentFrame && !this.anims.currentFrame.isLast) {
        return;
      }

      // Reset to the initial facing position
      if (this.lastAnimation) {
        this.anims.play(this.lastAnimation.key, false);
      }

      this.anims.stop();
    }
  }
}
