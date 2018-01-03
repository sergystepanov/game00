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
      }
    };

    Object.keys(animationConfig).forEach(key => {
      scene.anims.create(animationConfig[key]);
    });


    // console.log(scene.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3] }));
    // const animationConfig = {
    //   walkDown: {
    //     key: 'playerWalkDown',
    //     frames: scene.anims.generateFrameNumbers('walk_down', { frames: [0, 1, 2, 3] }),
    //     frameRate: FRAME_RATE,
    //     repeat: -1
    //   }
    // };
    //   walkUp: {
    //     key: 'playerWalkUp',
    //     frames: playerFrames.slice(34, 38),
    //     frameRate: FRAME_RATE,
    //     repeat: -1
    //   },
    //   walkLeft: {
    //     key: 'playerWalkLeft',
    //     frames: playerFrames.slice(51, 55),
    //     frameRate: FRAME_RATE,
    //     repeat: -1
    //   },
    //   walkRight: {
    //     key: 'playerWalkRight',
    //     frames: playerFrames.slice(17, 21),
    //     frameRate: FRAME_RATE,
    //     repeat: -1
    //   },
    //   swingUp: {
    //     key: 'playerSwingUp',
    //     frames: playerFrames.slice(0, 135),
    //     frameRate: FRAME_RATE,
    //     repeat: -1
    //   }
    // }

    // const p = scene.add.sprite(330, 100, 'player');
    // p.anims.add('swim', p.anims.generateFrameNames('walk_down', 0, 3, '', 4), 30, true);
    // p.anims.play('swim');

    // const walkDownAnimations = scene.anims.generateFrameNames('player');
    // console.log(walkDownAnimations);
    // scene.anims.add('walk_down', scene.anims.generateFrameNames('walk_down', 1, 4), 4, true);

    // scene.anims.create('walk_down')
    // scene.anims.create(animationConfig.walkUp)
    // scene.anims.create(animationConfig.walkLeft)
    // scene.anims.create(animationConfig.walkRight)
    // scene.anims.create(animationConfig.swingUp);

    // this.anims.load('walk_down')
    // this.anims.load('playerWalkLeft')
    // this.anims.load('playerWalkRight')
    // this.anims.load('playerSwingUp')
    // this.anims.load('playerWalkDown')
    // this.scaleX = 2
    // this.scaleY = 2

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

    config.scene.add.existing(this)
  }

  update() {
    if (this.downKey.isDown) {
      this.y += 5
      this.anims.play('walk_down', true)
    } else if (this.upKey.isDown) {
      this.y -= 5
      this.anims.play('walk_up', true)
    } else if (this.leftKey.isDown) {
      this.x -= 5
      this.anims.play('walk_left', true)
    } else if (this.rightKey.isDown) {
      this.x += 5
      this.anims.play('walk_right', true)
    } else if (this.spaceKey.isDown) {
      this.anims.play('swing_down', true);
    }

    if (this.downKey.isUp && this.upKey.isUp && this.leftKey.isUp && this.rightKey.isUp && this.spaceKey.isUp) {
      this.anims.stop()
    }
  }
}
