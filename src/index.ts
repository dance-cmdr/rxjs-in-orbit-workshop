import { GameScene } from './Client/GameScene';
import { interval, fromEvent, animationFrameScheduler } from 'rxjs';
import { ObjectLoader } from 'three';

import rocketModel from './Graphics/Rocket/model.json';
import { playerObjectFactory } from './Graphics/PlayerObject';
import {
  FPS,
  EARTH_RADIUS,
  PLAYER_OBJECT_SCALE,
  PLAYER_STARTING_POSITIONS,
} from './Game/constants';
import { setObjectPositon } from './utils/setPosition';

const gameClock$ = interval(1000 / FPS, animationFrameScheduler);

const windowSize$ = fromEvent(window, 'resize');
const gameScene = new GameScene(gameClock$, windowSize$, EARTH_RADIUS);
gameScene.mount(document.getElementById('game'));

// Model Loaders
const rocketLoader = new ObjectLoader();

const PLAYER_OBJECTS = [
  playerObjectFactory(rocketLoader.parse(rocketModel), PLAYER_OBJECT_SCALE),
  playerObjectFactory(rocketLoader.parse(rocketModel), PLAYER_OBJECT_SCALE, 0xff0000),
];

gameScene.add(...PLAYER_OBJECTS);

PLAYER_OBJECTS.forEach((object, index) =>
  setObjectPositon(object, PLAYER_STARTING_POSITIONS[index]),
);
