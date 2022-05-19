// eslint-disable-next-line import/no-unresolved

/** import the stage and the initial world */
import Act1 from './stages/Act1.js';
import InitialWorld from './worlds/InitialWorld.js';

/**
 * connect to backend
 *
 * For Firebase
 * import { getMyConfig } from '../config.js';
 *   Import the functions you need from the SDKs you need
 *   eslint-disable-next-line import/order
 * import { initializeApp } from 'firebase/app';
 *   TODO: Add SDKs for Firebase products that you want to use
 *   https://firebase.google.com/docs/web/setup#available-libraries
 * const firebaseConfig = getMyConfig();
 *   Initialize Firebase
 *   eslint-disable-next-line no-unused-vars
 * const app = initializeApp(firebaseConfig);
 */

/**
 * import the Finite State Machine
 *
 * import { mainService } from './mainMachine.js'
 */

/**
 * identify html elements and attach listeners
 *
 * const homebtn = document.querySelector('#homebtn')
 * homebtn.onclick = () => {mainService.send({type: 'HOME'})}
 * ...
 * homebtn.onmouseover = homeover
 * homebtn.onmouseout = msgout
 */

/**
 * create Global stage
 */
const container = document.querySelector('#scene-container');
const stage = new Act1(container, {
  controller: { type: 'orbit' },
  debug: false,
});
stage.init();

/**
 * just load the world
 */
stage.world = new InitialWorld(stage);
stage.world.init();
stage.start();

/**
 * world utility functions
 */
// eslint-disable-next-line no-unused-vars
const killWorld = () => {
  stage.stop();
  stage.world.dispose();
  stage.update();
};

/**
 * concatenates state.value keys with final text value, assumes xState state.value
 * like,
 * home: { secondstage: 'bigpicture'} => homesecondstagebigpicture
 * any state with a unique world must be listed in FSM subscription
 */
// eslint-disable-next-line no-unused-vars
const parseState = stateValue => {
  const header = [];
  let childState = stateValue;
  let loop = true;
  while (loop) {
    if (typeof childState === 'string' || childState instanceof String) {
      header.push(childState);
      loop = false;
    } else {
      const keys = Object.keys(childState);
      const localKey = keys[0];
      header.push(localKey);
      childState = childState[localKey];
    }
  }

  let startStr = '';
  for (let i = 0; i < header.length; i += 1) {
    const element = header[i];
    startStr += element;
  }
  return startStr;
};

/**
 * subscribe to ui state
 * lazy load world objects and initialize
 * change html element state
 * 
 * mainService.subscribe((state) => {
 *   homebtn.style.display = state.context.homebtn
 *   ...
 *   const stateStr = parseState(state.value)
 *   if ( stateStr === 'threefirst' ) {
      if (stage.world) { killWorld() }
      import('./worlds/ThreeWorld.js')
        .then((module) => 
        {
          stage.world = new module.default()
          stage.world.init()
          stage.start()
        })
    }
    currentStateStr = stateStr
 */
