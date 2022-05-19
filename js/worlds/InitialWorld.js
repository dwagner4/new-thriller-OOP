/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import World from '../systems/World.js';
import { createCubeTextureLoader } from '../systems/Loader.js';

import ElfScene from '../scenery/ElfScene.js';
import Elf from '../actors/Elf.js';

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

    const elf = new Elf();
    await elf.init();
    this.objectsToUpdate.push(elf);

    this.stage.scene.add(
      elf.model,
      elfscene.plane,
      elfscene.hemilight,
      elfscene.light
    );

    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    this.stage.camera.add(listener);

    // create a global audio source
    this.sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('assets/audio/ElfThriller1.mp3', buffer => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.sound.setVolume(0.5);
      // this.sound.play();
    });

    const container = document.querySelector('#scene-container');
    const dancebtn = document.getElementById('dance');
    dancebtn.onclick = () => {
      this.sound.play();
      console.log(elf);
      elf.animation.play('idle');
      dancebtn.style.display = 'none';
      container.requestFullscreen();
    };
  }

  update(time) {
    super.update(time);
  }

  dispose() {
    this.stage.disableVR();
  }
}
