import IObjModel from './IObj-Model'

export default class ObjModel implements IObjModel
{
    vertices: Float32Array[];
    faces: Int32Array[][];
    verticesNormals: Float32Array[];
}