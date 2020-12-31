# 3d-files-parser
Parser for 3d files such as OBJ, STL and etc.

# Table of Contents
- [Basic structure](#basic-structure)
  - [OBJ](#obj-structure)
- [How-to-reproduce](#how-to-reproduce)
- [Perform test](#perform-tests)
- [How it works](#how-it-works)
  - [OBJ Parser](#obj-parser)
  
<a name="basic-structure"></a>
# Basic structure
<a name="obj-structure"></a>
## OBJ structure
**NB** You can find and read full specification by [Paul Bourke](http://paulbourke.net/dataformats/obj/)

```shell

The following types of data may be included in an .obj file. In this
list, the keyword (in parentheses) follows the data type.

Vertex data

o       geometric vertices (v)
o       texture vertices (vt)
o       vertex normals (vn)
o       parameter space vertices (vp)
	   Free-form curve/surface attributes
o       rational or non-rational forms of curve or surface type:
	   basis matrix, Bezier, B-spline, Cardinal, Taylor (cstype)
o       degree (deg)
o       basis matrix (bmat)
o       step size (step)

Elements

o       point (p)
o       line (l)
o       face (f)
o       curve (curv)
o       2D curve (curv2)
o       surface (surf)

Free-form curve/surface body statements

o       parameter values (parm)
o       outer trimming loop (trim)
o       inner trimming loop (hole)
o       special curve (scrv)
o       special point (sp)
o       end statement (end)

Connectivity between free-form surfaces

o       connect (con)

Grouping

o       group name (g)
o       smoothing group (s)
o       merging group (mg)
o       object name (o)

Display/render attributes

o       bevel interpolation (bevel)
o       color interpolation (c_interp)
o       dissolve interpolation (d_interp)
o       level of detail (lod)
o       material name (usemtl)
o       material library (mtllib)
o       shadow casting (shadow_obj)
o       ray tracing (trace_obj)
o       curve approximation technique (ctech)
o       surface approximation technique (stech)


```

<a name="how-to-reproduce"></a>
# How to reproduce?
1. Clone or download repo
2. Execute this line in terminal: **node ./startNode.js** to start Node server
3. Put it in the browser line: **http://localhost:3001/examples/obj/index.html**
**NB!** after /examples/  you can write *obj* or *stl*. All examples are placed in [examples](examples/) folder.

<a name="perform-tests"></a>
# Tests
Chekout **package.json** for additional information.
### Parser
```console
npm run test:parser
```

<a name="how-it-works"></a>
# How it works?

<a name="obj-parser"></a>
## OBJ parser
