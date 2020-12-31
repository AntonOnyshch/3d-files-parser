import IFileParser from '../IFileParser'
import IObjModel from './IObj-Model'

enum StructureSymbols
{
    None = '',

    //#region Vertex data

    Comment = "#",
    MTLib = "mtlib",
    ModelName = "o",
    GeometricVertices = "v",
    TextureVertices = "vt",
    VerticesNormals = "vn",

    //#endregion

    //#region Elements

    Point = "p",
    Line = "l",
    Face = "f",
    Curve = "curv"

    //#endregion
}

enum ObjFileStructureTokens
{
    None = 0,

    //#region Vertex data

    Comment,
    MTLib,
    ModelName,
    GeometricVertices,
    TextureVertices,
    VertexNormals,

    //#endregion

    //#region Elements

    Point,
    Line,
    Face,
    Curve

    //#endregion
}

/**
 * Represents parser for OBJ file
 *  @extends IFileParser */
export class OBJParser implements IFileParser
{
    readonly spaceChar = ' ';
    readonly doubleSpaceChar = '  ';
    readonly slashChar = '/';
    readonly NEWLINE_DEC = 10;
    readonly SPACE_DEC = 32;
    private _buffer: Int8Array;
    private _indexer: number = 0;
    private _iobjModel: IObjModel;
    private decoder : TextDecoder;
    constructor(objModel: IObjModel) {
        this._iobjModel = objModel;
        this.decoder = new TextDecoder("utf-8");

        this._iobjModel.vertices = new Array<Float32Array>();
        this._iobjModel.verticesNormals = new Array<Float32Array>();
        this._iobjModel.faces = new Array<Array<Int32Array>>();
    }

    parse(buffer: ArrayBuffer): void {
        this._buffer = new Int8Array(buffer);

        //Index for 'end of file' detection
        let indexer: number = 0;
        //One line
        let line: string;
        //First two symbols(without spaces) of line
        let tokenSymbols: string;
        let newLineIndex = 0;
        let stringArray = [];
        let faceLineArray: Array<any> = [];
        while(indexer <= this._buffer.byteLength)
        {
            //line = this.getLine(this._buffer, indexer);
            newLineIndex = this.findNewLineIndex(indexer, this._buffer);
            //string line
            line = this.decoder.decode(this._buffer.subarray(this._indexer, newLineIndex));
            //increment indexer
            indexer += line.length + 1;
            this._indexer = indexer;
            
            //get token. For example: vt
            tokenSymbols = this.getTokenSymbols(line);
            //get line without token
            line = line.slice(2, line.length);
            switch (tokenSymbols) {
                case StructureSymbols.GeometricVertices:
                {
                    //remove all spaces at the beginning
                    line = this.deleteFirstSpaces(line);

                    if(line.includes(this.doubleSpaceChar)) {
                        stringArray = line.split(this.doubleSpaceChar, 3);
                    }
                    else {
                        stringArray = line.split(this.spaceChar, 3);
                    }
                    
                    const newVertices = new Float32Array(stringArray.length);
                    for (let i = 0; i < stringArray.length; i++) {
                        newVertices[i] = parseFloat(stringArray[i]);
                    }
                    this._iobjModel.vertices.push(newVertices);
                }
                break;
                case StructureSymbols.VerticesNormals:
                {
                    line = this.deleteFirstSpaces(line);

                    if(line.includes(this.spaceChar)) {
                        //stringArray = line.split(this.spaceChar, 3);
                        stringArray = this.split(line, this.spaceChar, 3);
                    }
                    
                    this._iobjModel.verticesNormals.push(new Float32Array(stringArray));
                }
                break;
                case StructureSymbols.Face:
                {
                    line = this.deleteFirstSpaces(line);

                    if(line.includes(this.doubleSpaceChar)) {
                        stringArray = line.split(this.doubleSpaceChar, 4);
                    }
                    else {
                        stringArray = line.split(this.spaceChar, 4);
                    }
            
                    if(stringArray[0].includes(this.slashChar)) {
                        stringArray.map((str, i) => faceLineArray[i] = str.split(this.slashChar, 3));
                    }
                    else {
                        stringArray.map((str, i) => faceLineArray[i] = str.split(this.spaceChar, 3));
                    }
            
                    const oneFaceArray = new Array(faceLineArray.length);
            
                    faceLineArray.map((arr, i) => oneFaceArray[i] = new Int32Array(arr));
            
                    for (let i = 0; i < oneFaceArray.length; i++) {
                        for (let j = 0; j < oneFaceArray[i].length; j++) {
                            oneFaceArray[i][j]--;
                        }
                    }
            
                    this._iobjModel.faces.push(oneFaceArray);
                }
                break;
                default:
                    break;
            }
        }
    }

    getTokenSymbols(line: string)
    {
        let startIndex = 0;
        let i = 0;
        for (; i < line.length; i++) {
            if(line[i] === this.spaceChar) {
                if(startIndex !== -1)
                {
                    return line.slice(startIndex, i);
                }
                else
                {
                    continue;
                }
            }
        }
        return line.slice(startIndex, i);
    }

    getBufferTokenSymbols()
    {
        let firstSymbolIndex = -1;
        let i = this._indexer;
        for (; i < this._buffer.length; i++) {
            if(this._buffer[i] === this.SPACE_DEC) {
                if(firstSymbolIndex !== -1)
                {
                    return this._buffer.subarray(firstSymbolIndex, i);
                }
                else
                {
                    continue;
                }
            }
            else
            {
                firstSymbolIndex = i;
            }
        }
        if(firstSymbolIndex === -1)
        {
            firstSymbolIndex++;
        }
        return this._buffer.subarray(firstSymbolIndex, i);
    }

    /**
    * @param {number} initial - initial index from where to start searching
    * @param {Int8Array} buffer - data buffer
    * @returns {number} index where Line feed symbol was found.
    */
    findNewLineIndex(initial: number, buffer: Int8Array) : number
    {
        for (let i = initial; i < buffer.length; i++)
            if(buffer[i] === this.NEWLINE_DEC)
                return i;
    }

    // getLine(buffer: Int8Array, startWith: number, maxLineLength = 30) {
    //     let i = startWith;
    //     for (; i < buffer.byteLength; i++) {
    //         if(buffer[i] === 10) {
    //             return this.decoder.decode(buffer.subarray(startWith, i));
    //         }
    //     }
    //     return (i - startWith) > maxLineLength ? '' : this.decoder.decode(buffer.subarray(startWith, i));
    // }

    deleteFirstSpaces(line: string) {
        let nSpaces = 0;
        for (let i = 0; i < line.length; i++)
        {
            if(line[i] === this.spaceChar)
            {
                nSpaces++;
            }
            else
            {
                //If first symbol isn't space symbol return just this line
                if(i === 0)
                {
                    return line;
                }
                return line.slice(nSpaces, line.length);
            }
        }
    }

    split(line: string, symbol: string, limit: number) {
        const retValue = new Array();
        let symbolStart = 0;
        let i = 0;
        for (; i < line.length; i++) {
            if(line[i] !== symbol) {
                symbolStart++;
                continue;
            }
            if(symbolStart > 0 && retValue.length <= limit) {
                retValue.push(line.slice(i - symbolStart, i));
                
                symbolStart = 0;
            }
        }
        if(symbolStart > 0) {
            retValue.push(line.slice(i - symbolStart, i));
        }
        return retValue;
    }
} 
