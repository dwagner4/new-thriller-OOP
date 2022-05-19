/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import World from '../systems/World.js';
import { createCubeTextureLoader } from '../systems/Loader.js';

import ElfScene from '../scenery/ElfScene.js';
import Heart from '../actors/Heart.js';
import MySphere from '../props/MySphere.js';

export default class InitialWorld extends World {
  constructor(stage) {
    super(stage);

    this.stage.camera.position.set(0, 2.5, 10);
    this.stage.scene.fog = new THREE.Fog(0x42280e, 10, 50);

    this.environmentMap = {};
    this.environmentMap.intensity = 0.25;
    const cubetextureloader = createCubeTextureLoader();
    this.environmentMap.texture = cubetextureloader.load([
      'assets/skybox/desertdawn_rt.jpg',
      'assets/skybox/desertdawn_lf.jpg',
      'assets/skybox/desertdawn_up.jpg',
      'assets/skybox/desertdawn_dn.jpg',
      'assets/skybox/desertdawn_bk.jpg',
      'assets/skybox/desertdawn_ft.jpg',
    ]);
    this.environmentMap.encoding = THREE.sRGBEncoding;
    this.stage.scene.environment = this.environmentMap.texture;
    this.stage.scene.background = this.environmentMap.texture;
    this.environmentMap.updateMaterials = () => {
      this.stage.scene.traverse(child => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();
  }

  async init() {
    await super.init();

    const elfscene = new ElfScene();
    await elfscene.init();

    const heart = new Heart();
    await heart.init();
    heart.model.position.y += 0.95;

    const sphere = new MySphere();
    await sphere.init();
    sphere.model.position.x += 1;
    sphere.model.position.y += 0.25;
    sphere.model.castShadow = true;

    this.stage.scene.add(
      sphere.model,
      heart.model,
      elfscene.plane,
      elfscene.hemilight,
      elfscene.light
    );
  }

  update(time) {
    super.update(time);
  }

  dispose() {
    this.stage.disableVR();
  }
}
