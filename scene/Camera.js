import { Matrix } from './Matrix.js';
import { Vector } from './Vector.js';
import { PerspectiveNormalizeMatrix } from './PerspectiveNormalizeMatrix.js';
import { OrthographicNormalizeMatrix } from './OrthographicNormalizeMatrix.js';

export class Camera {

    constructor() {
        this.left = -1.0;
        this.right = 1.0;
        this.bottom = -1.0;
        this.up = 1.0;
        this.n = 1.0;

        this.normalizeMatrix = PerspectiveNormalizeMatrix.build(this.left, this.right, this.bottom, this.top, this.n);

        this.perspective = true;
    }

    projPerspective(left, right, top, bottom, near) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.n = -near;

        this.normalizeMatrix = PerspectiveNormalizeMatrix.build(this.left, this.right, this.bottom, this.top, this.n);

        this.perspective = true;
    }

	projPerspectiveReset() {
		this.projPerspective(-1.0, 1.0, -1.0, 1.0, 1.0);
    }

    projOrtho(left, right, top, bottom) {
		this.left = left;
		this.right = right;
		this.top = top;
		this.bottom = bottom;
		this.n = 0;

		this.normalizeMatrix = OrthographicNormalizeMatrix.build(this.left, this.right, this.bottom, this.top);

		this.perspective = false;
	}

	projOrthoReset() {
		this.projOrtho(-1.0, 1.0, -1.0, 1.0);
    }

}
