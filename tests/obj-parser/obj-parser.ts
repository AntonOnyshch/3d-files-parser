import {OBJParser} from '../../src/obj/Obj-Parser'
import OBJModel from '../../src/obj/Obj-Model'

import 'mocha';
var assert = require('assert');

describe('OBJ-Parser', function() {
  const parser = new OBJParser(new OBJModel());
  describe('#findNewLineIndex().\nDescription: cycle inside seeks for UTF8 Line feed, which is = 10 and return index.', function() {
    
    const lines = [
      0x76, 0x20, 0x2d, 0x30, 0x2e, 0x30, 0x30, 
      0x30 , 0x35, 0x38, 0x31, 0x36, 0x39, 0x36, 
      0x20, 0x2d, 0x30, 0x2e, 0x37, 0x33, 0x34, 
      0x36, 0x36, 0x35, 0x20, 0x2d, 0x30, 0x2e, 
      0x36, 0x32, 0x33, 0x32, 0x36, 0x37, 0x0a, 
      0x76, 0x20, 0x30, 0x2e, 0x30, 0x30, 0x30, 
      0x32, 0x38, 0x33, 0x35, 0x33, 0x38, 0x20, 
      0x2d, 0x31, 0x20, 0x30, 0x2e, 0x32, 0x38, 
      0x36, 0x38, 0x34, 0x33, 0x0a, 0x76, 0x20, 
      0x2d, 0x30, 0x2e, 0x31, 0x31, 0x37, 0x32, 
      0x37, 0x37, 0x20, 0x2d, 0x30, 0x2e, 0x39, 
      0x37, 0x33, 0x35, 0x36, 0x34, 0x20, 0x30, 
      0x2e, 0x33, 0x30, 0x36, 0x39, 0x30, 0x37
    ];
    const buffer = new Int8Array(lines);

    it('should return 34 ', function() {
      assert.strictEqual(parser.findNewLineIndex(0, buffer), 34);
    });

    it('should return 60 ', function() {
      assert.strictEqual(parser.findNewLineIndex(35, buffer), 60);
    });
  });

  describe('#getTokenSymbols(line: string).\nDescription: choose only initial first or two symbols and return it.', function() {

    const lines = [
      'v -0.000581696 -0.734665 -0.623267',
      'vt  0.532 0.923 0.000',
      'vn  0.001 0.482 -0.876',
      'f 24/1/24 25/2/25 26/3/26'
    ];

    it('should return \'v\' ', function() {
      assert.strictEqual(parser.getTokenSymbols(lines[0]), 'v');
    });

    it('should return \'vt\' ', function() {
      assert.strictEqual(parser.getTokenSymbols(lines[1]), 'vt');
    });

    it('should return \'vn\' ', function() {
      assert.strictEqual(parser.getTokenSymbols(lines[2]), 'vn');
    });

    it('should return \'f\' ', function() {
      assert.strictEqual(parser.getTokenSymbols(lines[3]), 'f');
    });
  });
});