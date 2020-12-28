import ObjFile from './obj/Obj-File';

const volumeFile = {

    getObjFile: function(file: File) {
        return new ObjFile(file);
    }
}
export default volumeFile;