import * as THREE from 'three';

export default class world {
  constructor(stage) {
    this.stage = stage;
    this.objectsToUpdate = [];
  }

  async init() {
    this.raycaster = new THREE.Raycaster();
    this.workingMatrix = new THREE.Matrix4();
    this.workingVector = new THREE.Vector3();
  }

  update(time) {
    for (const object of this.objectsToUpdate) {
      if (object.update) {
        object.update(time);
      }
    }
  }

  dispose() {
    console.log(this.objectsToUpdate);
  }
}
