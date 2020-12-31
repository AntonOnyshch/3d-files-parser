import OBJModel from './Obj-Model'
import IObjModel from './IObj-Model'
import {OBJParser} from './Obj-Parser'

/** Represents Wavefront file */
export default class ObjFile
{
    private _file: File;
    private _objModel:IObjModel;
    private _objParser: OBJParser;
    private _fileReaderResult: string | ArrayBuffer;    
    /**
     * 
     * @param {File} file - input file that should be read.
     */
    constructor(file: File) {
        this._file = file;
        this._objModel = new OBJModel();
        this._objParser = new OBJParser(this._objModel);
    }

    /** @property {IOBJModel} model - contains Model of OBJ file */
    public get model() { return this._objModel };

    /** Read file's data into a buffer and parse its data into OBJModel */
    public async read() {
        const gotBuffer = await this.getBuffer(this._file);

        if(gotBuffer) {
            this._objParser.parse(this._fileReaderResult as ArrayBuffer);
        }
    }
    
    /** Reading file and writing its data into a buffer 
    * @param {File} file - input file that should be read.
    */
    private async getBuffer(file: File) : Promise<boolean> {
        const thisObj = this;
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();

            reader.onload = function () {
                thisObj._fileReaderResult = reader.result;
                resolve(true);
            }
    
            reader.onerror = function () {
                reject(false);
            }

            reader.readAsArrayBuffer(file);
        });
    }

}