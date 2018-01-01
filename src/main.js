import 'phaser'

import BootScene from './scenes/Boot'
import BootMenu from './scenes/BootMenu'
import PlayerScene from './scenes/examples/PlayerScene'
import MushroomScene from './scenes/examples/MushroomScene'

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'content',
  width: 320,
  height: 240,
  scene: [
    BootScene,
    // BootMenu,
    // MushroomScene,
    PlayerScene
  ]
})
