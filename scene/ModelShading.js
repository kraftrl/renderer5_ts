import { Matrix } from './Matrix.js'

export class ModelShading {

    static setColor(model, c) {
        if (model.colorList.length == 0) {
            for (var v of model.vertexList) {
                model.colorList.push(c);
            }
        }
        else {
            for (var i = 0; i < model.colorList.length; ++i) {
                model.colorList[i] = c;
            }
        }
    }

    static setRandomColor(model) {
        console.log(model);
        ModelShading.setColor(model, ModelShading.randomColor());
    }

    static setRandomVertexColor(model) {
        model.colorList = [];
        
        for (var v of model.vertexList) {
            model.colorList.push(ModelShading.randomColor());
        }

        for (var ls of model.lineSegmentList) {
            ls.cIndex[0] = ls.vIndex[0];
            ls.cIndex[1] = ls.vIndex[1];
        }
    }

    static setRandomColors(model) {
        if (model.colorList.length == 0) {
            ModelShading.setRandomVertexColors(model);
        }
        else {
            for (var i = 0; i < model.colorList.length; ++i) {
                model.colorList[i] = ModelShading.randomColor();
            }
        }
    }

	static setRandomLineSegmentColors(model) {
		model.colorList = [];
		var index = 0;
		for(var ls of model.lineSegmentList) {
			model.colorList.push( ModelShading.randomColor() );
			ls.cIndex[0] = index;
			ls.cIndex[1] = index;
			++index;
		}
	}

	static setRainbowLineSegmentColors(model) {
		model.colorList = [];
		var index = 0;
		for(var ls of model.lineSegmentList) {
			model.colorList.push( ModelShading.randomColor() );
			model.colorList.push( ModelShading.randomColor() );
			ls.cIndex[0] = index;
			ls.cIndex[1] = index + 1;
			index += 2;
		}
	}

	static randomColor() {
		var color = '#';
		var letters = '0123456789ABCDEF';
		for (var h = 0; h < 6; ++h) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

}
