/*

*/

/**

*/
class LineSegment {

	vIndex: Array<number>;
	cIndex: Array<number>;

	/**

	*/
	constructor(i0:number, i1:number, c0:number = i0, c1:number = i1) {
		this.vIndex = [i0, i1];
		this.cIndex = [c0, c1];
	}


	/**

	*/
	setColors(c0:number, c1:number) {
		this.cIndex[0] = c0;
		this.cIndex[1] = c1;
	}


	//For debugging
	toString() {
		return "Line Segment: ([" + this.vIndex[0] + ", " + this.vIndex[1] + "], [" + this.cIndex[0] + ", " + this.cIndex[1] + "])\n";
    }
}
