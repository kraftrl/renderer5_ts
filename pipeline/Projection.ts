/*

*/

/**

*/
class Projection {

	/**

	*/
	static project(model:Model, camera:Camera) {

		// A new vertex list to hold the transformed vertices.
		const newVertexList:Array<Vertex> = [];

		// Replace each Vertex object with one that contains
		// the original Vertex's projected (x,y) coordinates.
		for(const v of model.vertexList) {
			if( camera.perspective ) {
	            // Calculate the perspective projection.
	            newVertexList.push(
	              new Vertex(
	                v.x / -v.z,  // xp = xc / -zc
	                v.y / -v.z,  // yp = yc / -zc
	                -1));        // zp = -1
			} else {
	            // Calculate the parallel projection.
	            newVertexList.push(
	              new Vertex(
	                v.x,  // xp = xc
	                v.y,  // yp = yc
	                0));  // zp = 0
			}
		}

		return new Model(model.name,
						newVertexList,
						model.lineSegmentList,
						model.colorList,
						model.visible,
						model.debug);
	}
}
