/*

*/

/**

*/
class Axes2D extends Model{

	constructor(xMin = -1, xMax = 1, yMin = -1, yMax = 1, z = 0.0, xMarks = 5, yMarks = 5) {

		super("Axes2D");

		// x-axis
		this.addVertex( [new Vertex(xMin, 0, z), new Vertex(xMax, 0, z)] );
		this.addLineSegment( [new LineSegment(0, 1)] );

		// y-axis
		this.addVertex( [new Vertex(0, yMin, z), new Vertex(0, yMax, z)] );
		this.addLineSegment( [new LineSegment(2, 3)] );

		let index = 4;

		// Put evenly spaced tick marks on the x-axis.
		let xDelta = (xMax - xMin)/xMarks;
		let yDelta = (yMax - yMin)/50;
		for (let x = xMin; x <= xMax; x += xDelta) {
			this.addVertex( [new Vertex(x,  yDelta/2, z), new Vertex(x, -yDelta/2, z)] );
			this.addLineSegment( [new LineSegment(index+0, index+1)] );
			index += 2;
		}

		// Put evenly spaced tick marks on the y-axis.
		yDelta = (yMax - yMin)/yMarks;
		xDelta = (xMax - xMin)/50;
		for (let y = yMin; y <= yMax; y += yDelta) {
			this.addVertex( [new Vertex( xDelta/2, y, z), new Vertex(-xDelta/2, y, z)] );
			this.addLineSegment( [new LineSegment(index+0, index+1)] );
			index += 2;
		}
	}
}
