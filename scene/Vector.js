"use strict";
class Vector {
    constructor(x, y, z, w) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
        this.set(x, y, z, w);
    }
    set(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    // Return a new vector that is the scalar times this vector
    times(s) {
        return new Vector(s * this.x, s * this.y, s * this.z, s * this.w);
    }
    // Changes the current vector by multiplying each element
    timesEquals(s) {
        this.x = s * this.x;
        this.y = s * this.y;
        this.z = s * this.z;
        this.w = s * this.w;
        return this;
    }
    // Add a vector to this vector, returning a new one
    plus(v) {
        return new Vector(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }
    // Subtract a vector from this vector, returning a new one
    minus(v) {
        return new Vector(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
    }
    // Cross product of two vectors returns a new vector
    crossProduct(v) {
        return new Vector((this.y * v.z) - (this.z * v.y), (this.z * v.x) - (this.x * v.z), (this.x * v.y) - (this.y * v.x), 0.0);
    }
    // Dot product of two vectors
    dotProduct(v) {
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
    }
    // Return the normalized version of the vector
    normalize() {
        const norm = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        return new Vector(this.x / norm, this.y / norm, this.z / norm, 0.0);
    }
}
//# sourceMappingURL=Vector.js.map