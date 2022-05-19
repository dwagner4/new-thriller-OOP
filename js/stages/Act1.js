import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stage from '../systems/Stage.js';
// import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

export default class Act1 extends Stage {
  constructor(canvas) {
    super(canvas);

    /**
     * add controls
     */
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    // this.controls = new FlyControls(this.camera, this.canvas);
    // this.controls.movementSpeed = cameraObj.movementSpeed || 0.001;
    // this.controls.domElement = cameraObj.domElement || this.canvas;
    // this.controls.rollSpeed = cameraObj.rollSpeed || 0.0005;
    // this.controls.autoForward = cameraObj.autoForward;
    // this.controls.dragToLook = cameraObj.dragToLook;
  }
}
