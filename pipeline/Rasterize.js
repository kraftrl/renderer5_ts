import { Model } from './../scene/Model.js';
import { Vertex } from './../scene/Vertex.js';

export class Rasterize {

    static doAntialiasing = false;

    static rasterize(model, ls, cn) {
        var ctx = cn.getContext("2d");


        if (ctx != null) {
            // Make local copies of several values.
            var w = cn.width;
            var h = cn.height;

            var v0 = model.vertexList[ls.vIndex[0]];
            var v1 = model.vertexList[ls.vIndex[1]];

            var c0 = model.colorList[ls.cIndex[0]];
            var c1 = model.colorList[ls.cIndex[1]];

            var x0 = 0.5 + w / 2.001 * (v0.x + 1); // x_pp = 0.5 + w/2 * (x_p+1)
	    	var y0 = 0.5 + h / 2.001 * (v0.y + 1); // y_pp = 0.5 + h/2 * (y_p+1)
	    	var x1 = 0.5 + w / 2.001 * (v1.x + 1);
		    var y1 = 0.5 + h / 2.001 * (v1.y + 1);

		    x0 = Math.round(x0);
		    y0 = Math.round(y0);
		    x1 = Math.round(x1);
		    y1 = Math.round(y1);

            // Rasterize a degenerate line segment (a line segment)
            // that projected onto a point) as a single pixel.
            /*
            if ((x0 == x1) && (y0 == y1)) {
                var x0_vp = parseInt(x0) - 1;
                var y0_vp = h - parseInt(y0);
                ctx.fillStyle(c0);
            }
            */
    
            
            if (this.doAntialiasing) {
                ctx.translate(0.5, 0.5);
            }
            
		    var grd = ctx.createLinearGradient(x0, y0, x1, y1);
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
