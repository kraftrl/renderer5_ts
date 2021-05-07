/*

*/

/**

*/
class ModelShading {

	/**

	*/
	static setColor(model:Model, c:Uint8ClampedArray) {
		if(model.colorList.length == 0) {
			for(const v of model.vertexList) {
				model.colorList.push(c);
			}
		}
		else {
			for(let i = 0; i < model.colorList.length; ++i) {
				model.colorList[i] = c;
			}
		}
	}


	/**

	*/
	static setRandomColor(model:Model) {
		ModelShading.setColor( model, ModelShading.randomColor() );
	}


	static setRandomVertexColors(model:Model) {
		model.colorList = [];

		for (const v of model.vertexList) {
			model.colorList.push(ModelShading.randomColor());
		}

		for (const ls of model.lineSegmentList) {
			ls.cIndex[0] = ls.vIndex[0];
			ls.cIndex[1] = ls.vIndex[1];
		}
	}


	/**

	*/
	static setRandomColors(model:Model) {
		if(model.colorList.length == 0) {
			ModelShading.setRandomVertexColors(model);
		}
		else {
			for(let i = 0; i < model.colorList.length; ++i) {
				model.colorList[i] = ModelShading.randomColor();
			}
		}
	}

	/**

	*/
	static setRandomLineSegmentColors(model:Model) {
		model.colorList = [];
		let index = 0;
		for(const ls of model.lineSegmentList) {
			model.colorList.push( ModelShading.randomColor() );
			ls.cIndex[0] = index;
			ls.cIndex[1] = index;
			++index;
		}
	}


	/**

	*/
	static setRainbowLineSegmentColors(model:Model) {
		model.colorList = [];
		let index = 0;
		for(const ls of model.lineSegmentList) {
			model.colorList.push( ModelShading.randomColor() );
			model.colorList.push( ModelShading.randomColor() );
			ls.cIndex[0] = index;
			ls.cIndex[1] = index + 1;
			index += 2;
		}
	}


	/**

	*/
	static randomColor() {
		let r = Math.floor(Math.random() * 255);
		let g = Math.floor(Math.random() * 255);
		let b = Math.floor(Math.random() * 255);
		let a = Math.floor(Math.random() * 255);
		return new Uint8ClampedArray([r, g, b, a]);
	}
}
