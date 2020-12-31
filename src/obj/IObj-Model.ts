/** Declares mandatory properties for any OBJ model */
export default interface IObjModel {
    vertices: Array<Float32Array>;
    faces: Array<Array<Int32Array>>;
    verticesNormals: Array<Float32Array>;
}