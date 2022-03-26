import { initPointer, track, resetPointers } from '../../src/pointer.js';
import { simulateEvent } from '../utils.js';
import Scene from '../../src/scene.js';
import Sprite from '../../src/sprite.js';
// import TileEngine from '../../src/tileEngine.js';
import { init, getCanvas } from '../../src/core.js';
import { emit } from '../../src/events.js';

describe('pointer integration', () => {
  let canvas;
  let event = { identifier: 0, clientX: 0, clientY: 0 };
  let eventName = 'mousedown';

  before(() => {
    if (!getCanvas()) {
      let canvas = document.createElement('canvas');
      canvas.width = canvas.height = 600;
      init(canvas);
    }
  });

  beforeEach(() => {
    canvas = getCanvas();
    canvas.width = canvas.height = 600;
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;

    initPointer();

    simulateEvent('blur', {}, canvas);
  });

  afterEach(() => {
    resetPointers();
  });

  it('should trigger object event in a Scene', () => {
    let spy = sinon.spy();
    let object = Sprite({
      x: 200,
      y: 50,
      width: 25,
      height: 25,
      color: 'red',
      onDown: spy
    });

    let scene = Scene({
      id: 'scene',
      objects: [object]
    });

    track(object);
    scene.render();
    emit('tick');

    event.clientX = 200;
    event.clientY = 50;
    simulateEvent(eventName, event, canvas);

    expect(spy.called).to.be.true;
  });

  it('should trigger object event in a Scene using lookAt', () => {
    let spy = sinon.spy();
    let object = Sprite({
      x: 900,
      y: 50,
      width: 25,
      height: 25,
      color: 'red',
      onDown: spy
    });

    let scene = Scene({
      id: 'scene',
      objects: [object]
    });
    scene.lookAt(object);

    track(object);
    scene.render();
    emit('tick');

    event.clientX = canvas.width / 2;
    event.clientY = canvas.height / 2;
    simulateEvent(eventName, event, canvas);

    expect(spy.called).to.be.true;
  });
});
