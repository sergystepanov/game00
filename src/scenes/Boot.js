/* globals __DEV__ */

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
    if (__DEV__) {
      console.log('BootScene created!')
    }
  }

  preload() {

  }

  create() {
    this.scene.start('PlayerScene')
  }
}

export default BootScene
