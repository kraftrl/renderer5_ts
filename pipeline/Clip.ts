class Clip {

    static debug: boolean = false;

    static clipModel(model: Model): Model {

        let debug: boolean = Clip.debug && (Pipeline.debug || model.debug);

        const newLineSegmentList: Array<LineSegment> = [];

        let newVertexList: Array<Vertex> = [];
        for (const v of model.vertexList) {
            newVertexList.push(v);
        }

        let newColorList: Array<Uint8ClampedArray> = [];
        for (const c of model.colorList) {
            newColorList.push(c);
        }

        const model2: Model = new Model(model.name,
            newVertexList,
            model.lineSegmentList,
            newColorList,
            model.visible,
            model.debug);

        for (const ls of model2.lineSegmentList) {
            PipelineFB.logLineSegment("2. Clipping", model2, ls);

            let ls_clipped: LineSegment | null = Clip.clipSegment(model2, ls);

            if (ls_clipped != null) {
                newLineSegmentList.push(ls_clipped);
                PipelineFB.logLineSegment("2. Clipping (accept)", model2, ls_clipped)
            }
            else {
                PipelineFB.logLineSegment("2. Clipping (reject)", model2, ls)
            }
        }
        return new Model(model2.name,
            model2.vertexList,
            newLineSegmentList,
            model2.colorList,
            model2.visible,
            model2.debug);
    }

    static clipSegment(model: Model, ls: LineSegment): LineSegment | null {

        let debug: boolean = Clip.debug && (Pipeline.debug || model.debug);

        // Make local copies of several variables
        const v0: Vertex = Object.assign({}, model.vertexList[ls.vIndex[0]]);
        const v1: Vertex = Object.assign({}, model.vertexList[ls.vIndex[1]]);

        const x0 = v0.x;
        const x1 = v1.x;
        const y0 = v0.y;
        const y1 = v1.y;

        // Check for trivial accept
        if (!(Math.abs(x0) > 1
            || Math.abs(x1) > 1
            || Math.abs(y0) > 1
            || Math.abs(y1) > 1)) {
            if (debug) {
                console.log("-Trivial accept.");
            }
            return ls;
        }
        // Check for trivial delete
        else if ((x0 > 1 && x1 > 1)
            || (x0 < -1 && x1 < -1)
            || (y0 > 1 && y1 > 1)
            || (y0 < -1 && y1 < -1)) {
            if (debug) {
                console.log("-Trivial delete");
            }
            return null;
        }
        else {
            return Clip.clipSegment(model, Clip.clipOneTime(model, ls));
        }
    }

    static clipOneTime(model: Model, ls: LineSegment): LineSegment {

        let debug: boolean = Clip.debug && (Pipeline.debug || model.debug);

        // Make local copies of several variables
        const v0: Vertex = Object.assign({}, model.vertexList[ls.vIndex[0]]);
        const v1: Vertex = Object.assign({}, model.vertexList[ls.vIndex[1]]);

        const x0 = v0.x;
        const x1 = v1.x;
        const y0 = v0.y;
        const y1 = v1.y;

        let vIx: number, vIy: number; // inside
        let vOx: number, vOy: number; // outside
        let eqnNum: number; // Keep track of which edge is crossed
        let t: number; // When we cross the clipping line
        let x: number; // x-coordinate of where we cross the clipping line
        let y: number; // y-coordinate of where we cross the clipping line
        let equation: string;
        let vOutside: string;
        let vIndex: number; // Index of newly interpolated Vertex
        let inside: number; // Keep track of which vertex is on the inside


        if (x0 > 1) {
            // Crosses the line x = 1
            inside = 1;
            equation = "x = +1";
            vOutside = "v0";
            vOx = x0; vOy = y0;
            vIx = x1; vIy = y1;
            t = (1 - vOx) / (vIx - vOx);
            x = 1;
            y = (1 - t) * vOy + t * vIy;
            const newVertex = new Vertex(x, y, 0);

            // Modify the model to contain the new vertex
            vIndex = model.vertexList.length;
            model.vertexList.push(newVertex);
        }
        else if (x1 > 1) {
            // Crosses the line x = 1
            inside = 0;
            equation = "x = +1";
            vOutside = "v1";
            vIx = x0; vIy = y0;
            vOx = x1; vOy = y1;
            t = (1 - vOx) / (vIx - vOx);
            x = 1;
            y = (1 - t) * vOy + t * vIy;
            const newVertex = new Vertex(x, y, 0);

            // Modify the model to contain the new vertex
            vIndex = model.vertexList.length;
            model.vertexList.push(newVertex);
        }
        else if (x0 < -1) {
            // Crosses the line x = -1
            inside = 1;
            equation = "x = -1";
            vOutside = "v0";
            vOx = x0; vOy = y0;
            vIx = x1; vIy = y1;
            t = (-1 - vOx) / (vIx - vOx);
            x = -1;
            y = (1 - t) * vOy + t * vIy;
            const newVertex = new Vertex(x, y, 0);

            // Modify the model to contain the new vertex
            vIndex = model.vertexList.length;
            model.vertexList.push(newVertex);
        }
        else if (x1 < -1) {
            // Crosses the line x = -1
            inside = 0;
            equation = "x = -1";
            vOutside = "v1";
            vIx = x0; vIy = y0;
            vOx = x1; vOy = y1;
            t = (-1 - vOx) / (vIx - vOx);
            x = -1;
            y = (1 - t) * vOy + t * vIy;
            const newVertex = new Vertex(x, y, 0);

            // Modify the model to contain the new vertex
            vIndex = model.vertexList.length;
            model.vertexList.push(newVertex);
        }
        else if (y0 > 1) {
            // Crosses the line y = 1
            inside = 1;
            equation = "y = +1";
            vOutside = "v0";
            vOx = x0; vOy = y0;
            vIx = x1; vIy = y1;
            t = (1 - vOy) / (vIy - vOy);
            x = (1 - t) * vOx + t * vIx;
            y = 1;
            const newVertex = new Vertex(x, y, 0);

            // Modify the model to contain the new vertex
            vIndex = model.vertexList.length;
            model.vertexList.push(newVertex);
        }
        else if (y1 > 1) {
            // Crosses the line y = 1
            inside = 0;
            equation = "y = +1";
            vOutside = "v1";
            vIx = x0; vIy = y0;
            vOx = x1; vOy = y1;
            t = (1 - vOy) / (vIy - vOy);
            x = (1 - t) * vOx + t * vIx;
            y = 1;
            const newVertex = new Vertex(x, y, 0);

            // Modify the model to contain the new vertex
            vIndex = model.vertexList.length;
            model.vertexList.push(newVertex);
        }
        else if (y0 < -1) {
            // Crosses the line y = -1
            inside = 1;
            equation = "y = -1";
            vOutside = "v0";
            vOx = x0; vOy = y0;
            vIx = x1; vIy = y1;
            t = (-1 - vOy) / (vIy - vOy);
            x = (1 - t) * vOx + t * vIx;
            y = -1;
            const newVertex = new Vertex(x, y, 0);

            // Modify the model to contain the new vertex
            vIndex = model.vertexList.length;
            model.vertexList.push(newVertex);
        }
        else {
            // Crosses the line y = -1
            inside = 0;
            equation = "y = -1";
            vOutside = "v1";
            vIx = x0; vIy = y0;
            vOx = x1; vOy = y1;
            t = (-1 - vOy) / (vIy - vOy);
            x = (1 - t) * vOx + t * vIx;
            y = -1;
            const newVertex = new Vertex(x, y, 0);

            // Modify the model to contain the new vertex
            vIndex = model.vertexList.length;
            model.vertexList.push(newVertex);
        }

        // Use the value of t to interpolate the color of the new vertex
        let cI = model.colorList[ls.cIndex[inside]];
        let cO = model.colorList[ls.cIndex[1 - inside]];

        const r = (1 - t) * cO[0] + t * cI[0];
        const g = (1 - t) * cO[1] + t * cI[1];
        const b = (1 - t) * cO[2] + t * cI[2];
        const a = (1 - t) * cO[3] + t * cI[3];

        const newColor = new Uint8ClampedArray([r, g, b, a]);
        const cIndex = model.colorList.length;
        model.colorList.push(newColor);

        if (debug) {
            console.log("-Clip off " + vOutside + " at " + equation + "\n");
            console.log("- t = " + t.toPrecision(25) + "\n");
            console.log("- <x_i, y_i> = < " + vIx.toPrecision(24) + " " + vIy.toPrecision(24) + " >\n");
            console.log("- <x_o, y_o> = < " + vOx.toPrecision(24) + " " + vOy.toPrecision(24) + " >\n");
            console.log("- <x_c, y_c> = < " + x.toPrecision(24) + " " + y.toPrecision(24) + " >\n");

            console.log("- <r_i, g_i, b_i, a_i> = < " + cI[0].toPrecision(15) + " " + cI[1].toPrecision(15) + " " + cI[2].toPrecision(15) + " " + cI[3].toPrecision(15) + " >\n");
            console.log("- <r_o, g_o, b_o, a_o> = < " + cO[0].toPrecision(15) + " " + cO[1].toPrecision(15) + " " + cO[2].toPrecision(15) + " " + cO[3].toPrecision(15) + " >\n");
            console.log("- <r_c, g_c, b_c, a_c> = < " + r.toPrecision(15) + " " + g.toPrecision(15) + " " + b.toPrecision(15) + " " + a.toPrecision(15) + " >\n");
        }

        // Return new line segment using the new vertex and color
        // keeping the old line segment's inside vertex and color
        let newLS: LineSegment;
        if (0 == inside) {
            newLS = new LineSegment(ls.vIndex[0], vIndex, ls.cIndex[0], cIndex);
        }
        else {
            newLS = new LineSegment(vIndex, ls.vIndex[1], cIndex, ls.cIndex[1]);
        }
        
        return newLS;
    }

    
}

function hexToRGB(c: string): Array<number> {

    let r: number, g: number, b: number;
    let rh: string, gh: string, bh: string;

    rh = c.charAt(1) + c.charAt(2);
    gh = c.charAt(3) + c.charAt(4);
    bh = c.charAt(5) + c.charAt(6);

    r = parseInt(rh, 16);
    g = parseInt(gh, 16);
    b = parseInt(bh, 16);

    return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);

    let rgbHex: string = '#';
    let rhex = r.toString(16);
    let ghex = g.toString(16);
    let bhex = b.toString(16);

    // Ensure each color is represented by 2 characters in the hex string
    if (rhex.length == 1) {
        rhex = '0' + rhex;
    }
    if (ghex.length == 1) {
        ghex = '0' + ghex;
    }
    if (bhex.length == 1) {
        bhex = '0' + bhex;
    }
    rgbHex = rgbHex + rhex + ghex + bhex;
    return rgbHex;
}