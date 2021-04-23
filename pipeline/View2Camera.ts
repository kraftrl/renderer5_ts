class View2Camera {

    /*
    l: number = 0;
    r: number = 0;
    b: number = 0;
    t: number = 0;
    n: number = 0;
    */


    static view2camera(model: Model, normalizeMatrix: Matrix) {

        const newVertexList: Array<Vertex> = [];

        for (const v of model.vertexList) {
            newVertexList.push(normalizeMatrix.timesVertex(v));
        }

        return new Model(model.name,
                        newVertexList,
                        model.lineSegmentList,
                        model.colorList,
                        model.visible,
                        model.debug);
    }
}