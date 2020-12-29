import {OBJParser} from '../../src/obj/Obj-Parser'
import OBJModel from '../../src/obj/Obj-Model'

import 'mocha';
var assert = require('assert');

describe('OBJ-Parser', function() {
  describe('#getTokenSymbols(line: string)', function() {
    const parser = new OBJParser(new OBJModel());
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