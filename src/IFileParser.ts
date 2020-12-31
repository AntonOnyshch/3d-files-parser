/** Interface for parsers */
export default interface IFileParser {
    parse(buffer: ArrayBuffer) : void
}