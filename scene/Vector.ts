class Vector {

    x: number = 0;
    y: number = 0;
    z: number = 0;
    w: number = 0;

    constructor(x: number, y: number, z: number, w: number) {
        this.set(x, y, z, w);
    }

    set(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    // Return a new vector that is the scalar times this vector
    times(s: number) {
        return new Vector(s * this.x, s * this.y, s * this.z, s * this.w);
    }

    // Changes the current vector by multiplying each element
    timesEquals(s: number):Vector {
        this.x = s * this.x;
        this.y = s * this.y;
        this.z = s * this.z;
        this.w = s * this.w;
        return this;

    }

    // Add a vector to this vector, returning a new one
    plus(v: Vector) {
        return new Vector(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }

    // Subtract a vector from this vector, returning a new one
    minus(v: Vector) {
        return new Vector(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
    }

    // Cross product of two vectors returns a new vector
    crossProduct(v: Vector) {
        return new Vector(
            (this.y * v.z) - (this.z * v.y),
            (this.z * v.x) - (this.x * v.z),
            (this.x * v.y) - (this.y * v.x),
            0.0);
    }

    // Dot product of two vectors
    dotProduct(v: Vector) {
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
    }

    // Return the normalized version of the vector
    normalize() {
        const norm = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        return new Vector(this.x / norm, this.y / norm, this.z / norm, 0.0);
    }



    toString() {
        const precision = 5;
        return this.toStringP(precision);
    }

    toStringP(precision: number) {
        const iWidth = 3;
        return this.toStringiWidth(precision, iWidth);
    }

    toStringiWidth(precision: number, iWidth: number) {
        const p = precision;
        const t = p + iWidth + 2;

        let x1: string = this.x.toPrecision(p);
        let y1: string = this.y.toPrecision(p);
        let z1: string = this.z.toPrecision(p);
        let w1: string = this.w.toPrecision(p);

        return "[x, y, z, w] = [" + x1.padStart(t) + "  " + y1.padStart(t) + "  " + z1.padStart(t) + "  " + w1.padStart(t) + "]";
    }
}