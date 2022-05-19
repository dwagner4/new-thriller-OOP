import * as THREE from 'three';
import Actor from '../systems/Actor.js';
import { createGlbLoader } from '../systems/Loader.js';

export default class Elf extends Actor {
  constructor() {
    super();
    this.loopcount = 0;
  }

  async init() {
    super.init();
    const glbloader = await createGlbLoader();
    const [elfData, oneData, twoData, threeData, fourData] = await Promise.all([
      glbloader.loadAsync('/assets/elf/elf-worker-thriller-idle.gltf'),
      glbloader.loadAsync('/assets/elf/elf-worker-thriller-1.glb'),
      glbloader.loadAsync('/assets//elf/elf-worker-thriller-2.glb'),
      glbloader.loadAsync('/assets/elf/elf-worker-thriller-3.glb'),
      glbloader.loadAsync('/assets/elf/elf-worker-thriller-4.glb'),
    ]);
    const [mymodel] = elfData.scene.children;
    for (let m = 1; m < mymodel.children.length; m += 1) {
      mymodel.children[m].castShadow = true;
    }
    this.model = mymodel;

    const animations = [
      ...elfData.animations,
      ...oneData.animations,
      ...twoData.animations,
      ...threeData.animations,
      ...fourData.animations,
    ];

    this.animation.mixer = new THREE.AnimationMixer(this.model);

    this.animation.actions = {};

    this.animation.actions.idle = this.animation.mixer
      .clipAction(animations[0])
      .setLoop(THREE.LoopRepeat, 4);
    this.animation.actions.one = this.animation.mixer
      .clipAction(animations[1])
      .setLoop(THREE.LoopOnce, 1);
    this.animation.actions.two = this.animation.mixer
      .clipAction(animations[2])
      .setLoop(THREE.LoopOnce, 1);
    this.animation.actions.three = this.animation.mixer
      .clipAction(animations[3])
      .setLoop(THREE.LoopOnce, 1);
    this.animation.actions.four = this.animation.mixer
      .clipAction(animations[4])
      .setLoop(THREE.LoopOnce, 1);

    this.animation.actions.current = this.animation.actions.idle;

    this.animation.mixer.addEventListener('loop', e => {
      this.loopcount += 1;
      if (this.loopcount >= e.action.repetitions - 1) {
        // if ( this.loopcount >= 5) {
        this.loopcount = 0;
        const actionName = e.action._clip.name;
        if (actionName === 'idle') {
          this.animation.play('one');
        }
        if (actionName === 'one') {
          this.animation.play('two');
        }
        if (actionName === 'two') {
          this.animation.play('three');
        }
        if (actionName === 'three') {
          this.animation.play('four');
        }
        if (actionName === 'four') {
          this.animation.play('idle');
        }
      }
    });

    this.animation.mixer.addEventListener('finished', e => {
      const actionName = e.action._clip.name;
      if (actionName === 'idle') {
        this.animation.play('one');
      }
      if (actionName === 'one') {
        this.animation.play('two');
      }
      if (actionName === 'two') {
        this.animation.play('three');
      }
      if (actionName === 'three') {
        this.animation.play('four');
      }
      if (actionName === 'four') {
        this.animation.play('idle');
      }
    });
  }
}
