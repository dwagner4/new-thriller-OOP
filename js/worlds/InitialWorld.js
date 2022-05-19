import * as THREE from 'three';
import World from '../systems/World.js';

import HeartScenery from '../scenery/HeartScenery.js';
import Heart from '../actors/Heart.js';
import MySphere from '../props/MySphere.js';

export default class InitialWorld extends World {
  constructor(stage) {
    super(stage);

    this.stage.camera.position.set(0, 1.6, 5);
    this.stage.scene.background = new THREE.Color(0x003049);

    const hrtBgrd = new HeartScenery();
    this.stage.scene.add(hrtBgrd.hemilight, hrtBgrd.light, hrtBgrd.plane);
  }

  async init() {
    await super.init();

    const heart = new Heart();
    await heart.init();
    heart.model.position.y += 0.95;

    const sphere = new MySphere();
    await sphere.init();
    sphere.model.position.x += 1;
    sphere.model.position.y += 0.25;
    sphere.model.castShadow = true;

    this.stage.scene.add(sphere.model, heart.model);
  }

  update(time) {
    super.update(time);
  }

  dispose() {
    this.stage.disableVR();
  }
}
