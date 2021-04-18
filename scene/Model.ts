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
}
