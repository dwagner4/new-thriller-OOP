import * as THREE from 'three';
import Actor from '../systems/Actor.js';

export default class Heart extends Actor {
  constructor() {
    super();
    console.log(this);
  }

  async init() {
    const heartShape = new THREE.Shape();

    heartShape.moveTo(25, 25);
    heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
    heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
    heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
    heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
    heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
    heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

    const extrudeSettings = {
      depth: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

    this.model = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({ color: 0x88ddff })
    );
    this.model.scale.set(0.01, 0.01, 0.01);
    this.model.rotateZ(Math.PI * 1);
    this.model.castShadow = true;

    super.init();
  }
}
