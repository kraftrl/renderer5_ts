class View2Camera {

    /*
    l: number = 0;
    r: number = 0;
    b: number = 0;
    t: number = 0;
    n: number = 0;
    */


    static view2camera(model: Model, camera: Camera) {

        const l = camera.left;
        const r = camera.right;
        const b = camera.bottom;
        const t = camera.top;
        const near = -camera.n;

        const newVertexList: Array<Vertex> = [];

        let v_x: number;
        let v_y: number;
        let v_z: number;

        for (const v of model.vertexList) {
            if (camera.perspective) {
                // Parallel perspective
                v_z = v.z;
                v_x = v.x - v_z * (r + l) / (2 * near);
                v_y = v.y - v_z * (t + b) / (2 * near);

                v_x = (2 * near * v_x) / (r - l);
                v_y = (2 * near * v_y) / (t - b);
            }
            else {
                // Orthographic perspective
                v_z = v.z;
                v_x = v.x - (r + l) / 2;
                v_y = v.y - (t + b) / 2;

                v_x = (2 * v_x) / (r - l);
                v_y = (2 * v_y) / (t - b);
            }

            newVertexList.push(new Vertex(v_x, v_y, v_z));
        }

        return new Model(model.name,
                        newVertexList,
                        model.lineSegmentList,
                        model.colorList,
                        model.visible,
                        model.debug);
    }
}