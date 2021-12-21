import { Vertex } from './Vertex.js';
import { LineSegment } from './LineSegment.js';

/**
   A {@code Model} data structure represents a distinct geometric object
   in a {@link Scene}. A {@code Model} data structure is mainly a {@link List}
   of {@link Vertex} objects, a list of {@link LineSegment} objects, and a
   list of {@link Color} objects. Each {@link LineSegment} object contains
   four integers that are the indices of two {@link Vertex} objects from the
   {@code Model}'s vertex list and two {@link Color} objects from the
   {@code Model}'s color list. The two {@link Vertex} objects contain the
   coordinates, in the model's local coordinate system, for each of the line
   segment's two endpoints. The two {@link Color} objects contain the rgb
   values for each of the line segment's two endpoints.
<p>
   A {@code Model} represent the geometric object as a "wire-frame" of line
   segments, that is, the geometric object is drawn as a collection of "edges".
   This is a fairly simplistic way of doing 3D graphics and we will
   improve this in later renderers.
<p>
   See
<br> <a href="http://en.wikipedia.org/wiki/Wire-frame_model" target="_top">
              http://en.wikipedia.org/wiki/Wire-frame_model</a>
<br>or
<br> <a href="https://www.google.com/search?q=graphics+wireframe&tbm=isch" target="_top">
              https://www.google.com/search?q=graphics+wireframe&tbm=isch</a>
*/
export class Model {
    constructor(name, vertexList = [], lineSegmentList = [], colorList = [], visible = true, debug = false) {
        this.name = name;
        this.vertexList = vertexList;
        this.lineSegmentList = lineSegmentList;
        this.colorList = colorList;
        this.visible = visible;
        this.debug = debug;
        console.log(this.name);
    }

    /**
        Add a {@link Vertex} (or vertices) to this {@code Model}'s
        {@link List} of vertices.

        @param vArray  array of {@link Vertex} objects to add to this {@code Model}
    */
    addVertex(addVertList) {
        for (var v of addVertList) {
            this.vertexList.push(v);
        }
    }

    /**
        Add a {@link LineSegment} (or LineSegments) to this {@code Model}'s
        {@link List} of line segments.
        <p>
        NOTE: This method does not add any vertices to the {@code Model}'s
        {@link Vertex} list. This method assumes that the appropriate vertices
        have been added to the {@code Model}'s {@link Vertex} list.

        @param lsArray  array of {@link LineSegment} objects to add to this {@code Model}
    */
    addLineSegment(addLSList) {
        for (var ls of addLSList) {
            this.lineSegmentList.push(ls);
        }
    }

    addColor() {
        for (var c of arguments) {
            this.colorList.push(c);
        }
    }

    static loadFromJSON(fileName) {
        var xhttp = new XMLHttpRequest();
        var data = {};
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(xhttp.responseText);
            }
            else {
                return null;
            }
        };
        xhttp.open("GET", fileName, false);
        xhttp.send();
    
        var newVertexList = [];
        for (var v of data.vertexList) {
            newVertexList.push(new Vertex(v[0], v[1], v[2]));
        }

        var newLineSegmentList = [];
        for (var ls of data.lineSegmentList) {
            newLineSegmentList.push(new LineSegment(ls[0], ls[1]));
        }

        return new Model(data.name, newVertexList, newLineSegmentList);

    }

    static loadFromObj(fileName, name) {
        var xhttp = new XMLHtppRequest();
        var data;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                data = xhttp.responseText;
            }
        };
        xhttp.open("GET", fileName, false);
        xhttp.send();

        var newVertexList = [];
        var newLineSegmentList = [];

        var vertexMatches = data.match(/^v( -?\d+(\.\d+)?){3}$/gm);
        for (var v of vertexMatches) {
            var vertexSplit = v.split(" ");
            newVertexList.push(new Vertex(vertexSplit[1], vertexSplit[2], vertexSplit[3]));
        }

        var polygonMatches = data.match(/^f( -?\d+(\.\d+)?){3}$/gm);
        for (var p of polygonMatches) {
            var polySplit = p.split(" ");
            newLineSegmentList.push(new LineSegment(polySplit[1], polySplit[2]));
            newLineSegmentList.push(new LineSegment(polySplit[2], polySplit[3]));
            newLineSegmentList.push(new LineSegment(polySplit[1], polySplit[3]));
        }

        return new Model("Obj", newVertexList, newLineSegmentList);
    }

    static parseObj(data, name) {
        var newVertexList = [];
        var newLineSegmentList = [];
        
    }

}
