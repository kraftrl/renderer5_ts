/*

*/

/**

*/
class Circle extends Model{

	constructor(r = 1, n = 12) {

		super("Circle");

		if (n < 3) n = 3;

		// Create all the vertices.
		for (let i = 0; i < n; ++i)
		{
			const c = Math.cos(i*(2.0*Math.PI)/n);
			const s = Math.sin(i*(2.0*Math.PI)/n);
			const v = new Vertex(r * c, r * s, 0);
			this.addVertex( [v] );
		}

		// Create the line segments around the circle.
		for (let i = 0; i < n - 1; ++i)
		{
			this.addLineSegment( [new LineSegment(i, i+1)] );
		}
		this.addLineSegment( [new LineSegment(n-1, 0)] );
	}
}
