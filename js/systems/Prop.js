/* eslint-disable class-methods-use-this */
import * as THREE from 'three';

export default class Prop {
  constructor() {
    this.model = null;
    this.body = null;
    this.animations = [];
    this.animation = {};
  }

  async init() {
    /** load the model */

    /** 
     * loadAsync animations
     * pass clipAction to action object from animations array
     * 
     * this.stage.glbloader.loadAsync(
        '/assets/models/elf/elf-worker-thriller-4.glb'
      ),
       this.animations = [
        ...elfData.animations,
       ];
      this.animation.actions.idle = this.animation.mixer
        .clipAction(this.animations[0])
        .setLoop(THREE.LoopRepeat, 4);
      */

    /**
     * this.animation.actions.current = this.animation.actions.idle;
     * this.animation.mixer.addEventListener('loop', e => {
     * this.animation.mixer.addEventListener('finished', e => {
     */

    this.animation.mixer = new THREE.AnimationMixer(this.model);

    this.animation.play = name => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;
      const pVec = oldAction.getRoot().children[0].position;
      if (name === 'idle') {
        this.model.position.set(0, 0, 0);
      } else {
        this.model.translateX(pVec.x * 0.01);
        this.model.translateY(pVec.y * 0.01);
      }
      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1);

      this.animation.actions.current = newAction;
    };
  }

  setBody() {}

  update(time) {
    this.animation.mixer?.update(time.delta * 0.001);
  }

  dispose() {}
}
