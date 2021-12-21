import { Camera } from './Camera.js';
import { Position } from './Position.js';

export class Scene {
    constructor(camera = new Camera()) {
        this.camera = camera;
        this.positionList = [];
    }

    setCamera(camera) {
        this.camera = camera;
    }

    addPosition(positionsAdded) {
        for (var p of positionsAdded) {
          this.positionList.push(p);  
        }
    }

    getPosition(number) {
        return this.positionList[number];
    }

    getPositionList() {
        return this.positionList;
    }
}
