/*

*/

/**

*/
class Rasterize {

	/**

	*/
	static rasterize(model:Model, ls:LineSegment, cn:HTMLCanvasElement) {

		const ctx = cn.getContext("2d");

		if (ctx != null) {
			ctx.strokeStyle = "#ff00c0";

			// Make local copies of several values.
			const w = cn.width;
			const h = cn.height;

			const v0 = model.vertexList[ls.vIndex[0]];
			const v1 = model.vertexList[ls.vIndex[1]];

			const c0 = model.colorList[ls.cIndex[0]];
			const c1 = model.colorList[ls.cIndex[1]];

			// Transform each projected vertex to the "pixel plane" coordinate system.
			let x0 = 0.5 + w / 2.001 * (v0.x + 1); // x_pp = 0.5 + w/2 * (x_p+1)
			let y0 = 0.5 + h / 2.001 * (v0.y + 1); // y_pp = 0.5 + h/2 * (y_p+1)
			let x1 = 0.5 + w / 2.001 * (v1.x + 1);
			let y1 = 0.5 + h / 2.001 * (v1.y + 1);
			// NOTE: Notice the 2.001 fudge factor in the last two equations.
			// This is explained on page 142 of
			//    "Jim Blinn's Corner: A Trip Down The Graphics Pipeline"
			//     by Jim Blinn, 1996, Morgan Kaufmann Publishers.

			// Round the line segment's two endpoints to the nearest
			// logical pixel. This makes the algorithm a lot simpler,
			// but it can cause a slight, but noticable, shift of the
			// line segment.
			x0 = Math.round(x0);
			y0 = Math.round(y0);
			x1 = Math.round(x1);
			y1 = Math.round(y1);

			// Use the clipping and rasterizing algorithms
			// built into the browser's canvas.
			const grd = ctx.createLinearGradient(x0, y0, x1, y1);
			grd.addColorStop(0, c0);
			grd.addColorStop(1, c1);
			ctx.strokeStyle = grd;
			ctx.beginPath();
			ctx.moveTo(x0, y0);
			ctx.lineTo(x1, y1);
			ctx.stroke();
		}
	}
}
