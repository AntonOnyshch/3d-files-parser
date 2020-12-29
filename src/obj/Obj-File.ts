import OBJModel from './Obj-Model'
import IObjModel from './IObj-Model'
import {OBJParser} from './Obj-Parser'

export default class ObjFile
{
    constructor(file: File) {
        this._file = file;
        this._objModel = new OBJModel();
        this._objParser = new OBJParser(this._objModel);
    }

    private _file: File;

    private _objModel:IObjModel; 
    public get model() { return this._objModel };

    private _objParser: OBJParser;
    private _fileReaderResult: string | ArrayBuffer;

    public async read() {
        const gotBuffer = await this.getBuffer(this._file);

        if(gotBuffer) {
            this._objParser.parse(this._fileReaderResult as ArrayBuffer);
        }
    }
    
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