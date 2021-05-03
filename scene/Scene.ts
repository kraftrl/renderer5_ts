/*

*/

/**

*/
class Scene {

	camera: Camera;
	positionList: Array<Position>;

	/**

	*/
	constructor(camera:Camera = new Camera()) {
		this.camera = camera;
		this.positionList = [];
	}


	/**

	*/
	setCamera(camera:Camera) {
		this.camera = camera;
	}


	/**

	*/
	addPosition(positionsAdded: Array<Position>) {
		for(const p of positionsAdded) {
	    	this.positionList.push(p);
	  	}
	}


	/**

	*/
	getPosition(index:number) {
		return this.positionList[index];
	}

	/*
	setPosition(index: number, position:Position) {
		this.positionList.set(index,position);
	}
	*/

	/**

	*/
	getPositionList() {
		return this.positionList;
	}


	toString() {
		let result = "";
		result += this.camera.toString();
		result += "This Scene has " + this.positionList.length + " positions\n";
		let i = 0;
		for (const p of this.positionList) {
			result += "Position " + (i++) + "\n";
			result += p.toString();
		}

		return result;
    }
}
