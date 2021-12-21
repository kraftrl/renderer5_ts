class Model2View {

    static model2view(model: Model, modelMatrix: Matrix) {
        const newVertexList: Array<Vertex> = [];

        for (const v of model.vertexList) {
            newVertexList.push(modelMatrix.timesVertex(v));
        }

        return new Model(model.name,
            newVertexList,
            model.lineSegmentList,
            model.colorList,
            model.visible,
            model.debug);
    }
}