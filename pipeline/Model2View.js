"use strict";
class Model2View {
    static model2view(model, modelMatrix) {
        const newVertexList = [];
        for (const v of model.vertexList) {
            newVertexList.push(modelMatrix.timesVertex(v));
        }
        return new Model(model.name, newVertexList, model.lineSegmentList, model.colorList, model.visible, model.debug);
    }
}
//# sourceMappingURL=Model2View.js.map