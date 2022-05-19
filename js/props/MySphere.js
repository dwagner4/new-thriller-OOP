import * as THREE from 'three';
import Prop from '../systems/Prop.js';

export default class MySphere extends Prop {
  constructor() {
    super();
    console.log(this);
  }

  async init() {
    const geometry = new THREE.SphereGeometry(0.25, 32, 16);
    const material = new THREE.MeshPhongMaterial({ color: 0x222288 });
    this.model = new THREE.Mesh(geometry, material);
  }
}
