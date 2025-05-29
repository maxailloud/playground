import { Events } from 'phaser';

// Used to emit events between components, HTML and Phaser scenes
export const GameEventManager = new Events.EventEmitter();
