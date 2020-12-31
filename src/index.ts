import ObjFile from './obj/Obj-File';

const volumeFile = {

    getObjFile: function(file: File): ObjFile {
        return new ObjFile(file);
    }
}
export default volumeFile;