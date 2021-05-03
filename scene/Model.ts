/*

*/

/**

*/
class Model {

	name: string;
	vertexList: Array<Vertex>;
	lineSegmentList: Array<LineSegment>;
	colorList: Array<string>;
	visible: boolean;
	debug: boolean;
	/**

	*/
	constructor(name: string = "",
				vertexList: Array<Vertex> = [],
				lineSegmentList: Array<LineSegment> = [],
				colorList: Array<string> = [],
				visible: boolean = true,
				debug: boolean = false)
	{
		this.name = name;
		this.vertexList = vertexList;
		this.lineSegmentList = lineSegmentList;
		this.colorList = colorList;
		this.visible = visible;
		this.debug = debug;
	}


	/**

	*/
	addVertex(addVertList: Array<Vertex>) {
		for(const v of addVertList) {
			this.vertexList.push(v);
		}
	}


	/**

	*/
	addLineSegment(addLSList: Array<LineSegment>) {
		for(const ls of addLSList) {
			this.lineSegmentList.push(ls);
		}
	}


	/**

	*/
	addColor() {
		for(const c of arguments) {
			this.colorList.push(c);
		}
	}


	toString() {
		let result = "";

		result += "Model: " + this.name + "\n";
		result += "This Model's visibility is: " + this.visible + "\n";
		result += "Model has " + this.vertexList.length + " vertices.\n";
		result += "Model has " + this.colorList.length + " colors.\n";
		result += "Model has " + this.lineSegmentList.length + " line segments.\n";

		result += "Printing out this Model's vertices:\n";
		var i = 0;
		for (const v of this.vertexList) {
			result += i + ": " + v.toString() + "\n";
			++i;
		}

		result += "Printing out this Model's colors:\n";
		i = 0;
		for (const c of this.colorList) {
			result += i + ": " + c + "\n";
			++i;
		}

		result += "Printing out this Model's line segments:\n";
		i = 0;
		for (const ls of this.lineSegmentList) {
			result += i + ": " + ls.toString();
			++i;
		}

		return result;
    }
}
