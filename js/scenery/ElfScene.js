import * as THREE from 'three';
import Scenery from '../systems/Scenery.js';

export default class ElfScene extends Scenery {
  constructor() {
    super();

    this.hemilight = new THREE.HemisphereLight(0xff8800, 0xffffff, 1);

    this.light = new THREE.DirectionalLight(0xffffff, 1);
    // this.light.position.set(0, 10, 30).normalize();
    this.light.position.set(-10, 10, -30);
    this.light.castShadow = true;
    this.light.shadow.mapSize.width = 512;
    this.light.shadow.mapSize.height = 512;
    this.light.shadow.camera.near = 0.5;
    this.light.shadow.camera.far = 50;

    const geometry = new THREE.CircleGeometry(30, 20);
    const material = new THREE.MeshStandardMaterial({
      color: 0x888844,
      side: THREE.DoubleSide,
    });
    this.plane = new THREE.Mesh(geometry, material);
    this.plane.rotateX(-Math.PI / 2);
    this.plane.receiveShadow = true;
  }
}
