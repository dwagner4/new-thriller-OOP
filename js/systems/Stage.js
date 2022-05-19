/* eslint-disable class-methods-use-this */
import * as THREE from 'three';

export default class Stage {
  constructor(canvas) {
    /** setup sizes and time */
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    };
    window.addEventListener('resize', () => this.resize);

    this.time = {
      start: Date.now(),
      current: Date.now(),
      delta: 16,
      elapsed: 0,
    };

    /** set up scene object and cameras */
    this.canvas = canvas;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );

    /** setup renderer function */
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      physicallyCorrectLights: true,
      outputEncoding: THREE.sRGBEncoding,
      toneMapping: THREE.CineonToneMapping,
      toneMappingExposure: 1.75,
    });
    this.renderer.shadowMap.enabled = true; // needed? maybe set in world
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // needed? maybe set in world
    this.renderer.setClearColor('#211d20');
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // this.postProcessor = new PostProcess()

    /** initially setting animation loop to null, later call start() in main.js */
    this.renderer.setAnimationLoop(null);
  }

  resize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // this.postProcessor.resize()

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  }

  setCamera() {}

  enableVR(gripModels, controllerHandlers) {
    console.log(gripModels, controllerHandlers);
  }

  disableVR() {}

  enablePhysics() {}

  disbalePhysics() {}

  enablePostProcessing() {}

  disablePostProcessing() {}

  init() {
    // load global assets and resources
    // this.scene.background = color
  }

  update() {
    const currentTime = Date.now();
    this.time.delta = currentTime - this.time.current;
    this.time.current = currentTime;
    this.time.elapsed = this.current - this.time.start;

    this.controls?.update(this.time.delta);

    this.physWorld?.step(1 / 60, this.time.delta, 3);
    this.world?.update(this.time);

    // not needed with post processing
    this.renderer.render(this.scene, this.camera);
    // this.postProcessor.update()  // needed with postprocessing
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.update();
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  destroy() {
    this.sizes.off('resize');

    this.scene.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
      }

      const materialKeys = Object.keys(child.material);

      for (let index = 0; index < materialKeys.length; index += 1) {
        const value = child.material[materialKeys[index]];
        if (value && typeof value.dispose === 'function') {
          value.dispose();
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.dispose();
    if (this.debug.active) {
      this.debug.ui.destroy();
    }
  }
}
