
// Version 0.6.0 - Copyright 2012 - 2016 -  Jim Riecken <jimr@jimr.ca>
//
// Released under the MIT License - https://github.com/jriecken/sat-js
//
// A simple library for determining intersections of circles and
// polygons using the Separating Axis Theorem.
/** @preserve SAT.js - Version 0.6.0 - Copyright 2012 - 2016 - Jim Riecken <jimr@jimr.ca> - released under the MIT License. https://github.com/jriecken/sat-js */

/*global define: false, module: false*/
/*jshint shadow:true, sub:true, forin:true, noarg:true, noempty:true,
  eqeqeq:true, bitwise:true, strict:true, undef:true,
  curly:true, browser:true */

// Create a UMD wrapper for SAT. Works in:
//
//  - Plain browser via global SAT variable
//  - AMD loader (like require.js)
//  - Node.js
//
// The quoted properties all over the place are used so that the Closure Compiler
// does not mangle the exposed API in advanced mode.
/**
 * @param {*} root - The global scope
 * @param {Function} factory - Factory that creates SAT module
 */
(function (root, factory) {
  "use strict";
  if (typeof define === 'function' && define['amd']) {
    define(factory);
  } else if (typeof exports === 'object') {
    module['exports'] = factory();
  } else {
    root['SAT'] = factory();
  }
}(this, function () {
  "use strict";

  var SAT = {};

  //
  // ## Vector
  //
  // Represents a vector in two dimensions with `x` and `y` properties.


  // Create a new Vector, optionally passing in the `x` and `y` coordinates. If
  // a coordinate is not specified, it will be set to `0`
  /**
   * @param {?number=} x The x position.
   * @param {?number=} y The y position.
   * @constructor
   */
  function Vector(x, y) {
    this['x'] = x || 0;
    this['y'] = y || 0;
  }
  SAT['Vector'] = Vector;
  // Alias `Vector` as `V`
  SAT['V'] = Vector;


  // Copy the values of another Vector into this one.
  /**
   * @param {Vector} other The other Vector.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['copy'] = Vector.prototype.copy = function(other) {
    this['x'] = other['x'];
    this['y'] = other['y'];
    return this;
  };

  // Create a new vector with the same coordinates as this on.
  /**
   * @return {Vector} The new cloned vector
   */
  Vector.prototype['clone'] = Vector.prototype.clone = function() {
    return new Vector(this['x'], this['y']);
  };

  // Change this vector to be perpendicular to what it was before. (Effectively
  // roatates it 90 degrees in a clockwise direction)
  /**
   * @return {Vector} This for chaining.
   */
  Vector.prototype['perp'] = Vector.prototype.perp = function() {
    var x = this['x'];
    this['x'] = this['y'];
    this['y'] = -x;
    return this;
  };

  // Rotate this vector (counter-clockwise) by the specified angle (in radians).
  /**
   * @param {number} angle The angle to rotate (in radians)
   * @return {Vector} This for chaining.
   */
  Vector.prototype['rotate'] = Vector.prototype.rotate = function (angle) {
    var x = this['x'];
    var y = this['y'];
    this['x'] = x * Math.cos(angle) - y * Math.sin(angle);
    this['y'] = x * Math.sin(angle) + y * Math.cos(angle);
    return this;
  };

  // Reverse this vector.
  /**
   * @return {Vector} This for chaining.
   */
  Vector.prototype['reverse'] = Vector.prototype.reverse = function() {
    this['x'] = -this['x'];
    this['y'] = -this['y'];
    return this;
  };


  // Normalize this vector.  (make it have length of `1`)
  /**
   * @return {Vector} This for chaining.
   */
  Vector.prototype['normalize'] = Vector.prototype.normalize = function() {
    var d = this.len();
    if(d > 0) {
      this['x'] = this['x'] / d;
      this['y'] = this['y'] / d;
    }
    return this;
  };

  // Add another vector to this one.
  /**
   * @param {Vector} other The other Vector.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['add'] = Vector.prototype.add = function(other) {
    this['x'] += other['x'];
    this['y'] += other['y'];
    return this;
  };

  // Subtract another vector from this one.
  /**
   * @param {Vector} other The other Vector.
   * @return {Vector} This for chaiing.
   */
  Vector.prototype['sub'] = Vector.prototype.sub = function(other) {
    this['x'] -= other['x'];
    this['y'] -= other['y'];
    return this;
  };

  // Scale this vector. An independant scaling factor can be provided
  // for each axis, or a single scaling factor that will scale both `x` and `y`.
  /**
   * @param {number} x The scaling factor in the x direction.
   * @param {?number=} y The scaling factor in the y direction.  If this
   *   is not specified, the x scaling factor will be used.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['scale'] = Vector.prototype.scale = function(x,y) {
    this['x'] *= x;
    this['y'] *= y || x;
    return this;
  };

  // Project this vector on to another vector.
  /**
   * @param {Vector} other The vector to project onto.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['project'] = Vector.prototype.project = function(other) {
    var amt = this.dot(other) / other.len2();
    this['x'] = amt * other['x'];
    this['y'] = amt * other['y'];
    return this;
  };

  // Project this vector onto a vector of unit length. This is slightly more efficient
  // than `project` when dealing with unit vectors.
  /**
   * @param {Vector} other The unit vector to project onto.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['projectN'] = Vector.prototype.projectN = function(other) {
    var amt = this.dot(other);
    this['x'] = amt * other['x'];
    this['y'] = amt * other['y'];
    return this;
  };

  // Reflect this vector on an arbitrary axis.
  /**
   * @param {Vector} axis The vector representing the axis.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['reflect'] = Vector.prototype.reflect = function(axis) {
    var x = this['x'];
    var y = this['y'];
    this.project(axis).scale(2);
    this['x'] -= x;
    this['y'] -= y;
    return this;
  };

  // Reflect this vector on an arbitrary axis (represented by a unit vector). This is
  // slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
  /**
   * @param {Vector} axis The unit vector representing the axis.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['reflectN'] = Vector.prototype.reflectN = function(axis) {
    var x = this['x'];
    var y = this['y'];
    this.projectN(axis).scale(2);
    this['x'] -= x;
    this['y'] -= y;
    return this;
  };

  // Get the dot product of this vector and another.
  /**
   * @param {Vector}  other The vector to dot this one against.
   * @return {number} The dot product.
   */
  Vector.prototype['dot'] = Vector.prototype.dot = function(other) {
    return this['x'] * other['x'] + this['y'] * other['y'];
  };

  // Get the squared length of this vector.
  /**
   * @return {number} The length^2 of this vector.
   */
  Vector.prototype['len2'] = Vector.prototype.len2 = function() {
    return this.dot(this);
  };

  // Get the length of this vector.
  /**
   * @return {number} The length of this vector.
   */
  Vector.prototype['len'] = Vector.prototype.len = function() {
    return Math.sqrt(this.len2());
  };

  // ## Circle
  //
  // Represents a circle with a position and a radius.

  // Create a new circle, optionally passing in a position and/or radius. If no position
  // is given, the circle will be at `(0,0)`. If no radius is provided, the circle will
  // have a radius of `0`.
  /**
   * @param {Vector=} pos A vector representing the position of the center of the circle
   * @param {?number=} r The radius of the circle
   * @constructor
   */
  function Circle(pos, r) {
    this['pos'] = pos || new Vector();
    this['r'] = r || 0;
  }
  SAT['Circle'] = Circle;

  // Compute the axis-aligned bounding box (AABB) of this Circle.
  //
  // Note: Returns a _new_ `Polygon` each time you call this.
  /**
   * @return {Polygon} The AABB
   */
  Circle.prototype['getAABB'] = Circle.prototype.getAABB = function() {
    var r = this['r'];
    var corner = this["pos"].clone().sub(new Vector(r, r));
    return new Box(corner, r*2, r*2).toPolygon();
  };

  // ## Polygon
  //
  // Represents a *convex* polygon with any number of points (specified in counter-clockwise order)
  //
  // Note: Do _not_ manually change the `points`, `angle`, or `offset` properties. Use the
  // provided setters. Otherwise the calculated properties will not be updated correctly.
  //
  // `pos` can be changed directly.

  // Create a new polygon, passing in a position vector, and an array of points (represented
  // by vectors relative to the position vector). If no position is passed in, the position
  // of the polygon will be `(0,0)`.
  /**
   * @param {Vector=} pos A vector representing the origin of the polygon. (all other
   *   points are relative to this one)
   * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
   *   in counter-clockwise order.
   * @constructor
   */
  function Polygon(pos, points) {
    this['pos'] = pos || new Vector();
    this['angle'] = 0;
    this['offset'] = new Vector();
    this.setPoints(points || []);
  }
  SAT['Polygon'] = Polygon;

  // Set the points of the polygon.
  //
  // Note: The points are counter-clockwise *with respect to the coordinate system*.
  // If you directly draw the points on a screen that has the origin at the top-left corner
  // it will _appear_ visually that the points are being specified clockwise. This is just
  // because of the inversion of the Y-axis when being displayed.
  /**
   * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
   *   in counter-clockwise order.
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['setPoints'] = Polygon.prototype.setPoints = function(points) {
    // Only re-allocate if this is a new polygon or the number of points has changed.
    var lengthChanged = !this['points'] || this['points'].length !== points.length;
    if (lengthChanged) {
      var i;
      var calcPoints = this['calcPoints'] = [];
      var edges = this['edges'] = [];
      var normals = this['normals'] = [];
      // Allocate the vector arrays for the calculated properties
      for (i = 0; i < points.length; i++) {
        calcPoints.push(new Vector());
        edges.push(new Vector());
        normals.push(new Vector());
      }
    }
    this['points'] = points;
    this._recalc();
    return this;
  };

  // Set the current rotation angle of the polygon.
  /**
   * @param {number} angle The current rotation angle (in radians).
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['setAngle'] = Polygon.prototype.setAngle = function(angle) {
    this['angle'] = angle;
    this._recalc();
    return this;
  };

  // Set the current offset to apply to the `points` before applying the `angle` rotation.
  /**
   * @param {Vector} offset The new offset vector.
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['setOffset'] = Polygon.prototype.setOffset = function(offset) {
    this['offset'] = offset;
    this._recalc();
    return this;
  };

  // Rotates this polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `pos`).
  //
  // Note: This changes the **original** points (so any `angle` will be applied on top of this rotation).
  /**
   * @param {number} angle The angle to rotate (in radians)
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['rotate'] = Polygon.prototype.rotate = function(angle) {
    var points = this['points'];
    var len = points.length;
    for (var i = 0; i < len; i++) {
      points[i].rotate(angle);
    }
    this._recalc();
    return this;
  };

  // Translates the points of this polygon by a specified amount relative to the origin of *its own coordinate
  // system* (i.e. `pos`).
  //
  // This is most useful to change the "center point" of a polygon. If you just want to move the whole polygon, change
  // the coordinates of `pos`.
  //
  // Note: This changes the **original** points (so any `offset` will be applied on top of this translation)
  /**
   * @param {number} x The horizontal amount to translate.
   * @param {number} y The vertical amount to translate.
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['translate'] = Polygon.prototype.translate = function (x, y) {
    var points = this['points'];
    var len = points.length;
    for (var i = 0; i < len; i++) {
      points[i].x += x;
      points[i].y += y;
    }
    this._recalc();
    return this;
  };


  // Computes the calculated collision polygon. Applies the `angle` and `offset` to the original points then recalculates the
  // edges and normals of the collision polygon.
  /**
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype._recalc = function() {
    // Calculated points - this is what is used for underlying collisions and takes into account
    // the angle/offset set on the polygon.
    var calcPoints = this['calcPoints'];
    // The edges here are the direction of the `n`th edge of the polygon, relative to
    // the `n`th point. If you want to draw a given edge from the edge value, you must
    // first translate to the position of the starting point.
    var edges = this['edges'];
    // The normals here are the direction of the normal for the `n`th edge of the polygon, relative
    // to the position of the `n`th point. If you want to draw an edge normal, you must first
    // translate to the position of the starting point.
    var normals = this['normals'];
    // Copy the original points array and apply the offset/angle
    var points = this['points'];
    var offset = this['offset'];
    var angle = this['angle'];
    var len = points.length;
    var i;
    for (i = 0; i < len; i++) {
      var calcPoint = calcPoints[i].copy(points[i]);
      calcPoint.x += offset.x;
      calcPoint.y += offset.y;
      if (angle !== 0) {
        calcPoint.rotate(angle);
      }
    }
    // Calculate the edges/normals
    for (i = 0; i < len; i++) {
      var p1 = calcPoints[i];
      var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];
      var e = edges[i].copy(p2).sub(p1);
      normals[i].copy(e).perp().normalize();
    }
    return this;
  };


  // Compute the axis-aligned bounding box. Any current state
  // (translations/rotations) will be applied before constructing the AABB.
  //
  // Note: Returns a _new_ `Polygon` each time you call this.
  /**
   * @return {Polygon} The AABB
   */
  Polygon.prototype["getAABB"] = Polygon.prototype.getAABB = function() {
    var points = this["calcPoints"];
    var len = points.length;
    var xMin = points[0]["x"];
    var yMin = points[0]["y"];
    var xMax = points[0]["x"];
    var yMax = points[0]["y"];
    for (var i = 1; i < len; i++) {
      var point = points[i];
      if (point["x"] < xMin) {
        xMin = point["x"];
      }
      else if (point["x"] > xMax) {
        xMax = point["x"];
      }
      if (point["y"] < yMin) {
        yMin = point["y"];
      }
      else if (point["y"] > yMax) {
        yMax = point["y"];
      }
    }
    return new Box(this["pos"].clone().add(new Vector(xMin, yMin)), xMax - xMin, yMax - yMin).toPolygon();
  };


  // ## Box
  //
  // Represents an axis-aligned box, with a width and height.


  // Create a new box, with the specified position, width, and height. If no position
  // is given, the position will be `(0,0)`. If no width or height are given, they will
  // be set to `0`.
  /**
   * @param {Vector=} pos A vector representing the bottom-left of the box (i.e. the smallest x and smallest y value).
   * @param {?number=} w The width of the box.
   * @param {?number=} h The height of the box.
   * @constructor
   */
  function Box(pos, w, h) {
    this['pos'] = pos || new Vector();
    this['w'] = w || 0;
    this['h'] = h || 0;
  }
  SAT['Box'] = Box;

  // Returns a polygon whose edges are the same as this box.
  /**
   * @return {Polygon} A new Polygon that represents this box.
   */
  Box.prototype['toPolygon'] = Box.prototype.toPolygon = function() {
    var pos = this['pos'];
    var w = this['w'];
    var h = this['h'];
    return new Polygon(new Vector(pos['x'], pos['y']), [
     new Vector(), new Vector(w, 0),
     new Vector(w,h), new Vector(0,h)
    ]);
  };

  // ## Response
  //
  // An object representing the result of an intersection. Contains:
  //  - The two objects participating in the intersection
  //  - The vector representing the minimum change necessary to extract the first object
  //    from the second one (as well as a unit vector in that direction and the magnitude
  //    of the overlap)
  //  - Whether the first object is entirely inside the second, and vice versa.
  /**
   * @constructor
   */
  function Response() {
    this['a'] = null;
    this['b'] = null;
    this['overlapN'] = new Vector();
    this['overlapV'] = new Vector();
    this.clear();
  }
  SAT['Response'] = Response;

  // Set some values of the response back to their defaults.  Call this between tests if
  // you are going to reuse a single Response object for multiple intersection tests (recommented
  // as it will avoid allcating extra memory)
  /**
   * @return {Response} This for chaining
   */
  Response.prototype['clear'] = Response.prototype.clear = function() {
    this['aInB'] = true;
    this['bInA'] = true;
    this['overlap'] = Number.MAX_VALUE;
    return this;
  };

  // ## Object Pools

  // A pool of `Vector` objects that are used in calculations to avoid
  // allocating memory.
  /**
   * @type {Array.<Vector>}
   */
  var T_VECTORS = [];
  for (var i = 0; i < 10; i++) { T_VECTORS.push(new Vector()); }

  // A pool of arrays of numbers used in calculations to avoid allocating
  // memory.
  /**
   * @type {Array.<Array.<number>>}
   */
  var T_ARRAYS = [];
  for (var i = 0; i < 5; i++) { T_ARRAYS.push([]); }

  // Temporary response used for polygon hit detection.
  /**
   * @type {Response}
   */
  var T_RESPONSE = new Response();

  // Tiny "point" polygon used for polygon hit detection.
  /**
   * @type {Polygon}
   */
  var TEST_POINT = new Box(new Vector(), 0.000001, 0.000001).toPolygon();

  // ## Helper Functions

  // Flattens the specified array of points onto a unit vector axis,
  // resulting in a one dimensional range of the minimum and
  // maximum value on that axis.
  /**
   * @param {Array.<Vector>} points The points to flatten.
   * @param {Vector} normal The unit vector axis to flatten on.
   * @param {Array.<number>} result An array.  After calling this function,
   *   result[0] will be the minimum value,
   *   result[1] will be the maximum value.
   */
  function flattenPointsOn(points, normal, result) {
    var min = Number.MAX_VALUE;
    var max = -Number.MAX_VALUE;
    var len = points.length;
    for (var i = 0; i < len; i++ ) {
      // The magnitude of the projection of the point onto the normal
      var dot = points[i].dot(normal);
      if (dot < min) { min = dot; }
      if (dot > max) { max = dot; }
    }
    result[0] = min; result[1] = max;
  }

  // Check whether two convex polygons are separated by the specified
  // axis (must be a unit vector).
  /**
   * @param {Vector} aPos The position of the first polygon.
   * @param {Vector} bPos The position of the second polygon.
   * @param {Array.<Vector>} aPoints The points in the first polygon.
   * @param {Array.<Vector>} bPoints The points in the second polygon.
   * @param {Vector} axis The axis (unit sized) to test against.  The points of both polygons
   *   will be projected onto this axis.
   * @param {Response=} response A Response object (optional) which will be populated
   *   if the axis is not a separating axis.
   * @return {boolean} true if it is a separating axis, false otherwise.  If false,
   *   and a response is passed in, information about how much overlap and
   *   the direction of the overlap will be populated.
   */
  function isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {
    var rangeA = T_ARRAYS.pop();
    var rangeB = T_ARRAYS.pop();
    // The magnitude of the offset between the two polygons
    var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
    var projectedOffset = offsetV.dot(axis);
    // Project the polygons onto the axis.
    flattenPointsOn(aPoints, axis, rangeA);
    flattenPointsOn(bPoints, axis, rangeB);
    // Move B's range to its position relative to A.
    rangeB[0] += projectedOffset;
    rangeB[1] += projectedOffset;
    // Check if there is a gap. If there is, this is a separating axis and we can stop
    if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
      T_VECTORS.push(offsetV);
      T_ARRAYS.push(rangeA);
      T_ARRAYS.push(rangeB);
      return true;
    }
    // This is not a separating axis. If we're calculating a response, calculate the overlap.
    if (response) {
      var overlap = 0;
      // A starts further left than B
      if (rangeA[0] < rangeB[0]) {
        response['aInB'] = false;
        // A ends before B does. We have to pull A out of B
        if (rangeA[1] < rangeB[1]) {
          overlap = rangeA[1] - rangeB[0];
          response['bInA'] = false;
        // B is fully inside A.  Pick the shortest way out.
        } else {
          var option1 = rangeA[1] - rangeB[0];
          var option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      // B starts further left than A
      } else {
        response['bInA'] = false;
        // B ends before A ends. We have to push A out of B
        if (rangeA[1] > rangeB[1]) {
          overlap = rangeA[0] - rangeB[1];
          response['aInB'] = false;
        // A is fully inside B.  Pick the shortest way out.
        } else {
          var option1 = rangeA[1] - rangeB[0];
          var option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      }
      // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.
      var absOverlap = Math.abs(overlap);
      if (absOverlap < response['overlap']) {
        response['overlap'] = absOverlap;
        response['overlapN'].copy(axis);
        if (overlap < 0) {
          response['overlapN'].reverse();
        }
      }
    }
    T_VECTORS.push(offsetV);
    T_ARRAYS.push(rangeA);
    T_ARRAYS.push(rangeB);
    return false;
  }
  SAT['isSeparatingAxis'] = isSeparatingAxis;

  // Calculates which Voronoi region a point is on a line segment.
  // It is assumed that both the line and the point are relative to `(0,0)`
  //
  //            |       (0)      |
  //     (-1)  [S]--------------[E]  (1)
  //            |       (0)      |
  /**
   * @param {Vector} line The line segment.
   * @param {Vector} point The point.
   * @return  {number} LEFT_VORONOI_REGION (-1) if it is the left region,
   *          MIDDLE_VORONOI_REGION (0) if it is the middle region,
   *          RIGHT_VORONOI_REGION (1) if it is the right region.
   */
  function voronoiRegion(line, point) {
    var len2 = line.len2();
    var dp = point.dot(line);
    // If the point is beyond the start of the line, it is in the
    // left voronoi region.
    if (dp < 0) { return LEFT_VORONOI_REGION; }
    // If the point is beyond the end of the line, it is in the
    // right voronoi region.
    else if (dp > len2) { return RIGHT_VORONOI_REGION; }
    // Otherwise, it's in the middle one.
    else { return MIDDLE_VORONOI_REGION; }
  }
  // Constants for Voronoi regions
  /**
   * @const
   */
  var LEFT_VORONOI_REGION = -1;
  /**
   * @const
   */
  var MIDDLE_VORONOI_REGION = 0;
  /**
   * @const
   */
  var RIGHT_VORONOI_REGION = 1;

  // ## Collision Tests

  // Check if a point is inside a circle.
  /**
   * @param {Vector} p The point to test.
   * @param {Circle} c The circle to test.
   * @return {boolean} true if the point is inside the circle, false if it is not.
   */
  function pointInCircle(p, c) {
    var differenceV = T_VECTORS.pop().copy(p).sub(c['pos']);
    var radiusSq = c['r'] * c['r'];
    var distanceSq = differenceV.len2();
    T_VECTORS.push(differenceV);
    // If the distance between is smaller than the radius then the point is inside the circle.
    return distanceSq <= radiusSq;
  }
  SAT['pointInCircle'] = pointInCircle;

  // Check if a point is inside a convex polygon.
  /**
   * @param {Vector} p The point to test.
   * @param {Polygon} poly The polygon to test.
   * @return {boolean} true if the point is inside the polygon, false if it is not.
   */
  function pointInPolygon(p, poly) {
    TEST_POINT['pos'].copy(p);
    T_RESPONSE.clear();
    var result = testPolygonPolygon(TEST_POINT, poly, T_RESPONSE);
    if (result) {
      result = T_RESPONSE['aInB'];
    }
    return result;
  }
  SAT['pointInPolygon'] = pointInPolygon;

  // Check if two circles collide.
  /**
   * @param {Circle} a The first circle.
   * @param {Circle} b The second circle.
   * @param {Response=} response Response object (optional) that will be populated if
   *   the circles intersect.
   * @return {boolean} true if the circles intersect, false if they don't.
   */
  function testCircleCircle(a, b, response) {
    // Check if the distance between the centers of the two
    // circles is greater than their combined radius.
    var differenceV = T_VECTORS.pop().copy(b['pos']).sub(a['pos']);
    var totalRadius = a['r'] + b['r'];
    var totalRadiusSq = totalRadius * totalRadius;
    var distanceSq = differenceV.len2();
    // If the distance is bigger than the combined radius, they don't intersect.
    if (distanceSq > totalRadiusSq) {
      T_VECTORS.push(differenceV);
      return false;
    }
    // They intersect.  If we're calculating a response, calculate the overlap.
    if (response) {
      var dist = Math.sqrt(distanceSq);
      response['a'] = a;
      response['b'] = b;
      response['overlap'] = totalRadius - dist;
      response['overlapN'].copy(differenceV.normalize());
      response['overlapV'].copy(differenceV).scale(response['overlap']);
      response['aInB']= a['r'] <= b['r'] && dist <= b['r'] - a['r'];
      response['bInA'] = b['r'] <= a['r'] && dist <= a['r'] - b['r'];
    }
    T_VECTORS.push(differenceV);
    return true;
  }
  SAT['testCircleCircle'] = testCircleCircle;

  // Check if a polygon and a circle collide.
  /**
   * @param {Polygon} polygon The polygon.
   * @param {Circle} circle The circle.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testPolygonCircle(polygon, circle, response) {
    // Get the position of the circle relative to the polygon.
    var circlePos = T_VECTORS.pop().copy(circle['pos']).sub(polygon['pos']);
    var radius = circle['r'];
    var radius2 = radius * radius;
    var points = polygon['calcPoints'];
    var len = points.length;
    var edge = T_VECTORS.pop();
    var point = T_VECTORS.pop();

    // For each edge in the polygon:
    for (var i = 0; i < len; i++) {
      var next = i === len - 1 ? 0 : i + 1;
      var prev = i === 0 ? len - 1 : i - 1;
      var overlap = 0;
      var overlapN = null;

      // Get the edge.
      edge.copy(polygon['edges'][i]);
      // Calculate the center of the circle relative to the starting point of the edge.
      point.copy(circlePos).sub(points[i]);

      // If the distance between the center of the circle and the point
      // is bigger than the radius, the polygon is definitely not fully in
      // the circle.
      if (response && point.len2() > radius2) {
        response['aInB'] = false;
      }

      // Calculate which Voronoi region the center of the circle is in.
      var region = voronoiRegion(edge, point);
      // If it's the left region:
      if (region === LEFT_VORONOI_REGION) {
        // We need to make sure we're in the RIGHT_VORONOI_REGION of the previous edge.
        edge.copy(polygon['edges'][prev]);
        // Calculate the center of the circle relative the starting point of the previous edge
        var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
        region = voronoiRegion(edge, point2);
        if (region === RIGHT_VORONOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          var dist = point.len();
          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);
            T_VECTORS.push(point2);
            return false;
          } else if (response) {
            // It intersects, calculate the overlap.
            response['bInA'] = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
        T_VECTORS.push(point2);
      // If it's the right region:
      } else if (region === RIGHT_VORONOI_REGION) {
        // We need to make sure we're in the left region on the next edge
        edge.copy(polygon['edges'][next]);
        // Calculate the center of the circle relative to the starting point of the next edge.
        point.copy(circlePos).sub(points[next]);
        region = voronoiRegion(edge, point);
        if (region === LEFT_VORONOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          var dist = point.len();
          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);
            return false;
          } else if (response) {
            // It intersects, calculate the overlap.
            response['bInA'] = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
      // Otherwise, it's the middle region:
      } else {
        // Need to check if the circle is intersecting the edge,
        // Change the edge into its "edge normal".
        var normal = edge.perp().normalize();
        // Find the perpendicular distance between the center of the
        // circle and the edge.
        var dist = point.dot(normal);
        var distAbs = Math.abs(dist);
        // If the circle is on the outside of the edge, there is no intersection.
        if (dist > 0 && distAbs > radius) {
          // No intersection
          T_VECTORS.push(circlePos);
          T_VECTORS.push(normal);
          T_VECTORS.push(point);
          return false;
        } else if (response) {
          // It intersects, calculate the overlap.
          overlapN = normal;
          overlap = radius - dist;
          // If the center of the circle is on the outside of the edge, or part of the
          // circle is on the outside, the circle is not fully inside the polygon.
          if (dist >= 0 || overlap < 2 * radius) {
            response['bInA'] = false;
          }
        }
      }

      // If this is the smallest overlap we've seen, keep it.
      // (overlapN may be null if the circle was in the wrong Voronoi region).
      if (overlapN && response && Math.abs(overlap) < Math.abs(response['overlap'])) {
        response['overlap'] = overlap;
        response['overlapN'].copy(overlapN);
      }
    }

    // Calculate the final overlap vector - based on the smallest overlap.
    if (response) {
      response['a'] = polygon;
      response['b'] = circle;
      response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
    }
    T_VECTORS.push(circlePos);
    T_VECTORS.push(edge);
    T_VECTORS.push(point);
    return true;
  }
  SAT['testPolygonCircle'] = testPolygonCircle;

  // Check if a circle and a polygon collide.
  //
  // **NOTE:** This is slightly less efficient than polygonCircle as it just
  // runs polygonCircle and reverses everything at the end.
  /**
   * @param {Circle} circle The circle.
   * @param {Polygon} polygon The polygon.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testCirclePolygon(circle, polygon, response) {
    // Test the polygon against the circle.
    var result = testPolygonCircle(polygon, circle, response);
    if (result && response) {
      // Swap A and B in the response.
      var a = response['a'];
      var aInB = response['aInB'];
      response['overlapN'].reverse();
      response['overlapV'].reverse();
      response['a'] = response['b'];
      response['b'] = a;
      response['aInB'] = response['bInA'];
      response['bInA'] = aInB;
    }
    return result;
  }
  SAT['testCirclePolygon'] = testCirclePolygon;

  // Checks whether polygons collide.
  /**
   * @param {Polygon} a The first polygon.
   * @param {Polygon} b The second polygon.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testPolygonPolygon(a, b, response) {
    var aPoints = a['calcPoints'];
    var aLen = aPoints.length;
    var bPoints = b['calcPoints'];
    var bLen = bPoints.length;
    // If any of the edge normals of A is a separating axis, no intersection.
    for (var i = 0; i < aLen; i++) {
      if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, a['normals'][i], response)) {
        return false;
      }
    }
    // If any of the edge normals of B is a separating axis, no intersection.
    for (var i = 0;i < bLen; i++) {
      if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, b['normals'][i], response)) {
        return false;
      }
    }
    // Since none of the edge normals of A or B are a separating axis, there is an intersection
    // and we've already calculated the smallest overlap (in isSeparatingAxis).  Calculate the
    // final overlap vector.
    if (response) {
      response['a'] = a;
      response['b'] = b;
      response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
    }
    return true;
  }
  SAT['testPolygonPolygon'] = testPolygonPolygon;

  return SAT;
}));

function Atom(circle, angle, color, element){
	this.circle = circle;
	this.angle = angle;
	this.color = color;
	this.element = element;
}

function Molecule(atoms, type){
  this.atoms = atoms;
  this.type = type;
}

function Score(date){
  this._id = date;
  this.points = 0;
  this.increaseScore = function(i){
      this.points += i;
  }
}

function Screen(width, height){
	this.width = width;
	this.height = height;
}


function Ship(triangle, centerX, centerY){

	this.triangle = triangle;
	this.x = centerX;
	this.y = centerY;
	this.angle = 0;
	this.resultingAngle = 0;
	this.forceX = 0;
	this.forceY = 0;
	this.energy = 15;
	this.imortality = true;

	this.applyForces = function(){
		this.triangle.translate(-this.x, -this.y);
		this.x += this.forceX;
		this.y -= this.forceY;
		this.triangle.translate(this.x, this.y);
	}

	this.slide = function(delay){
				if (this.forceX > 0) {
						if (this.forceX - delay > 0) {
								this.forceX -= delay;
						} else {
								this.forceX = 0;
						}
				} else if (this.forceX < 0) {
						if (this.forceX + delay < 0) {
								this.forceX += delay;
						} else {
								this.forceX = 0;
						}
				}
				if (this.forceY > 0) {
						if (this.forceY - delay > 0) {
								this.forceY -= delay;
						} else {
								this.forceY = 0;
						}
				} else if (this.forceY < 0) {
						if (this.forceY + delay < 0) {
								this.forceY += delay;
						} else {
								this.forceY = 0;
						}
				}
	}

	this.regulateVelocity = function(maxVelocity){
			if (this.forceX > maxVelocity) {
					this.forceX = maxVelocity;
			} else if (this.forceX < (-maxVelocity)) {
					this.forceX = (-maxVelocity);
			}
			if (this.forceY > maxVelocity) {
					this.forceY = maxVelocity;
			} else if (this.forceY < (-maxVelocity)) {
					this.forceY = (-maxVelocity);
			}
	}

	this.move = function(keys){
				if (38 in keys) {
					this.boost();
					this.drawFire(ctx, this.throwFire());
				}
				if (39 in keys) {
					this.turn(2);
				}
				if (37 in keys) {
					this.turn(-2);
				}
	}

	this.throwFire = function(){
			var losangle = new SAT.Polygon(new SAT.Vector(0, 0),
			[new SAT.Vector(-3, -3), new SAT.Vector(0,-5), new SAT.Vector(3,-3), new SAT.Vector(0,5)]);
			losangle.translate(this.x, this.y);
			losangle.translate(-this.x, -(this.y-13));
			losangle.rotate((Math.PI/180)* this.angle );
			losangle.translate(this.x, this.y);
			return losangle;
	}

	this.boost = function(){
			this.resultingAngle = this.angle;
			if ((this.angle < 90 || this.angle > 270) || (this.angle > 90 && this.angle < 270)) {//CIMA BAIXO
		           this.forceY += Math.cos(this.angle * Math.PI / 180) * 0.006;
		  }
		  if ((this.angle < 360 && this.angle > 180) || (this.angle < 180 && this.angle > 0)) { //DIREITA ESQUERDA
		           this.forceX += Math.sin(this.angle * Math.PI / 180) * 0.006;
		  }
	}

	this.turn = function(i){
			this.angle += i;
			if(this.angle >= 360){
	        this.angle = 0;
	    }else if(this.angle < 0){
	        this.angle = 359;
	    }
			this.triangle.translate(-this.x, -this.y);
			this.triangle.rotate((Math.PI/180)* i );
			this.triangle.translate(this.x, this.y);
	}

	this.shoot = function(shots, keys){
			if(17 in keys){
				if(this.energy >= 15){
					var circle = new SAT.Circle(new SAT.Vector(this.x , this.y), 2);
					var shot = new Shot(circle, this.angle);

					var audio = new Audio('./../../sounds/shot.m4a');
					audio.play();

					shots.push(shot);
					this.energy -= 15;
				}
			}else{
				if(this.energy < 15){
					this.energy += 2;
			  }
			}
			return shots;
	}

	this.obeyLimit = function(width, height){
			if(this.x > width){
						this.triangle.translate(-this.x, -this.y);
						this.x = 0;
						this.triangle.translate(this.x, this.y);
			}else if(this.x < 0){
						this.triangle.translate(-this.x, -this.y);
						this.x = width;
						this.triangle.translate(this.x, this.y);
			}else if(this.y > height){
						this.triangle.translate(-this.x, -this.y);
						this.y = 0;
						this.triangle.translate(this.x, this.y);
			}else if(this.y < 0){
						this.triangle.translate(-this.x, -this.y);
						this.y = height;
						this.triangle.translate(this.x, this.y);
			}
	}

	this.drawShip = function(ctx){
			ctx.beginPath();
	    ctx.moveTo(this.triangle['points'][0]['x'], this.triangle['points'][0]['y']);
	    ctx.lineTo(this.triangle['points'][1]['x'], this.triangle['points'][1]['y']);
	    ctx.lineTo(this.triangle['points'][2]['x'], this.triangle['points'][2]['y']);
	    ctx.lineTo(this.triangle['points'][0]['x'], this.triangle['points'][0]['y']);
			if(this.imortality === true){
				ctx.lineWidth = 0.8;
				ctx.strokeStyle = "grey";
			}else {
				ctx.lineWidth = 1.5;
				ctx.strokeStyle = "white";
			}
	    ctx.stroke();
	    ctx.closePath();
	}

	this.drawFire = function(ctx, losangle){
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.moveTo(losangle['points'][0]['x'], losangle['points'][0]['y']);
			ctx.lineTo(losangle['points'][1]['x'], losangle['points'][1]['y']);
			ctx.lineTo(losangle['points'][2]['x'], losangle['points'][2]['y']);
			ctx.lineTo(losangle['points'][3]['x'], losangle['points'][3]['y']);
			ctx.lineTo(losangle['points'][0]['x'], losangle['points'][0]['y']);
			ctx.strokeStyle = "white";
			ctx.stroke();
			ctx.closePath();
	}

	this.setImortality = function(bool){
    this.imortality = bool;
  }

}

function Game(ctx, scr){

  this.ctx = ctx;
  this.scr = scr;

  this.hasMoleculesAndAtoms = true;
  this.hasShip = true;

  this.ship;
  this.level = 1;
  this.lifes = 3;

  this.shots = [];
  this.aloneAtoms = [];
  this.molecules = [];

  this.IntervalId;
  this.score = new Score(new Date().toISOString());

  this.createShip = function(){
  	var triangle = new SAT.Polygon(new SAT.Vector(0, 0), [new SAT.Vector(-6, -6),
  	new SAT.Vector(6,-6), new SAT.Vector(0,7)]);
  	triangle.rotate((Math.PI/180)*180);
  	triangle.translate(this.scr.width/2, this.scr.height/2);
  	var ship = new Ship(triangle, this.scr.width/2, this.scr.height/2);
  	this.ship = ship;
  }

  this.moveShip = function(keys){
    this.ship.move(keys);//..........................................................MOVE A NAVE
    this.ship.regulateVelocity(1.5);//...............................................LIMITA A VELOCIDADE DA NAVE (FORÇAS)
    this.ship.slide(0.001);//........................................................FAZ COM QUE A NAVE RETARDE
    this.ship.applyForces();//.......................................................FAZ COM QUE A NAVE GANHE "VELOCIDADE" (FORÇA)
    this.ship.obeyLimit(this.scr.width, this.scr.height);//..........................FAZ COM QUE A NAVE OBEDEÇA OS LIMITES DA TELA
    this.ship.drawShip(this.ctx);
  }

  this.moveShots = function(){
    for(i = 0; i<this.shots.length; i++){
				this.shots[i].move(3);//......................................................MOVE O TIRO
				this.shots[i].obeyLimit(this.scr.width, this.scr.height);//...................FAZ COM QUE O TIRO OBEDEÇA OS LIMITES DA TELA
				this.shots[i].LoseReach(0.1);//...............................................FAZ QUE O TIRO PERCA "TEMPO DE VIDA"
				if(this.shots[i].reach <= 0){//...............................................VERIFICA O TEMPO DE VIDA DO TIRO
					this.shots.splice(i, 1);//..................................................REMOVE O TIRO
				}else{
					this.shots[i].drawShot(this.ctx);//.........................................DESENHA O TIRO
				}
		}
  }

  this.moveAloneAtoms = function(i){
    this.aloneAtoms[i].move();
    this.aloneAtoms[i].obeyLimit(this.scr.width, this.scr.height);
    this.aloneAtoms[i].drawAtom(this.ctx);
  }

  this.verifyShotMoleculeColision = function(i,x,circle){
    var response = new SAT.Response();
    var collided = SAT.testCircleCircle(circle, this.shots[x].circle, response);//.....VERIFICA A COLISÃO
    if(collided === true){
      this.aloneAtoms = this.molecules[i].divide(this.aloneAtoms);//...................DIVIDE A MOLÉCULA
      this.molecules.splice(i, 1);//...................................................REMOVE A MOLÉCULA
      this.shots.splice(x, 1);//.......................................................REMOVE O TIRO
      this.score.increaseScore(10);//..................................................AUMENTA O SCORE
      var audio = new Audio('./../../sounds/shoted.m4a');
      audio.play();
    }
  }

  this.verifyShotAtomColision = function(i,x,circle){
    var response = new SAT.Response();
    var collided = SAT.testCircleCircle(circle,this.shots[x].circle, response);//......VERIFICA A COLISÃO
    if(collided === true){
      this.aloneAtoms.splice(i, 1);//..................................................REMOVE O ÁTOMO
      this.shots.splice(x, 1);//.......................................................REMOVE O TIRO
      this.score.increaseScore(10);//..................................................AUMENTA O SCORE
      var audio = new Audio('./../../sounds/shoted.m4a');
      audio.play();
    }
  }

  this.doShipMoleculeColision = function(i){
      this.aloneAtoms = this.molecules[i].divide(this.aloneAtoms);
      this.molecules.splice(i, 1);//...................................................REMOVE A MOLECULA
      this.lifes -= 1;//...............................................................FAZ A NAVE PERDER VIDA
      this.hasShip = false;//..........................................................ACIONA O TEMPORIZADOR DE RESPAWN
      //var audio = new Audio('./../../sounds/bum.m4a');
      //audio.play();
  }

  this.doShipAtomColision = function(i){
      this.aloneAtoms.splice(i, 1);//..................................................REMOVE O ÁTOMO
      this.lifes -= 1;//...............................................................FAZ A NAVE PERDER VIDA
      this.hasShip = false;//..........................................................ACIONA O TEMPORIZADOR DE RESPAWN
      //var audio = new Audio('./../../sounds/bum.m4a');
      //audio.play();
  }

  this.respawnShip = function(){
    this.createShip();//...............................................................RECRIA A NAVE
    this.hasShip = true;
    this.ship.setImortality(true);
  }

  this.submitForm = function(){
    clearInterval(this.IntervalId);//..................................................INTERROMPE O LOOP;
    window.document.formulario.date.value = ''+this.score._id;
    window.document.formulario.points.value = ''+this.score.points;
    document.getElementById("form").submit();//........................................ENVIA O SCORE PARA A PÁGINA DE SUBMISSÃO
  }

  this.setShots = function(shots){
    this.shots = shots;
  }

  this.loadMolecules = function(){
  	for(i = 0; i<(this.level+5); i++){
  		var moleculeId = Math.floor(Math.random() * 10 + 1);
  		this.createMolecule(moleculeId);
  	}
  }

  this.createMolecule = function(type){

  	if(type === 1){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 30);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-38, y+25), 15);
  		var circle3 = new SAT.Circle(new SAT.Vector(x, y+45), 15);
  		var circle4 = new SAT.Circle(new SAT.Vector(x+38, y+25), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "orange", "N"));
  		atoms.push(new Atom(circle2, angle, "blue", "H"));
  		atoms.push(new Atom(circle3, angle, "blue", "H"));
  		atoms.push(new Atom(circle4, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "NH₃");

  		this.molecules.push(molecule);

  	}else if(type === 2){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 25);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-35, y+15), 15);
  		var circle3 = new SAT.Circle(new SAT.Vector(x+35, y+15), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "red", "O"));
  		atoms.push(new Atom(circle2, angle, "blue", "H"));
  		atoms.push(new Atom(circle3, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "H₂O");

  		this.molecules.push(molecule);

  	}else if(type === 3){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 26);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-35, y+15), 15);
  		var circle3 = new SAT.Circle(new SAT.Vector(x, y-40), 15);
  		var circle4 = new SAT.Circle(new SAT.Vector(x+35, y+15), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "purple", "B"));
  		atoms.push(new Atom(circle2, angle, "grey", "F"));
  		atoms.push(new Atom(circle3, angle, "grey", "F"));
  		atoms.push(new Atom(circle4, angle, "grey", "F"));

  		var molecule = new Molecule(atoms, "BF₃");

  		this.molecules.push(molecule);

  	}else if(type === 4){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 28);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-38, y+18), 15);
  		var circle3 = new SAT.Circle(new SAT.Vector(x, y+42), 15);
  		var circle4 = new SAT.Circle(new SAT.Vector(x, y-42), 15);
  		var circle5 = new SAT.Circle(new SAT.Vector(x+38, y+18), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "brown", "C"));
  		atoms.push(new Atom(circle2, angle, "blue", "H"));
  		atoms.push(new Atom(circle3, angle, "blue", "H"));
  		atoms.push(new Atom(circle4, angle, "blue", "H"));
  		atoms.push(new Atom(circle5, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "CH₄");

  		this.molecules.push(molecule);

  	}else if(type === 5){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 35);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-58, y), 25);
  		var circle3 = new SAT.Circle(new SAT.Vector(x, y+58), 25);
  		var circle4 = new SAT.Circle(new SAT.Vector(x, y-58), 25);
  		var circle5 = new SAT.Circle(new SAT.Vector(x+58, y), 25);
  		var circle6 = new SAT.Circle(new SAT.Vector(x-60, y-40), 15);
  		var circle7 = new SAT.Circle(new SAT.Vector(x+60, y+40), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "green", "S"));
  		atoms.push(new Atom(circle2, angle, "red", "O"));
  		atoms.push(new Atom(circle3, angle, "red", "O"));
  		atoms.push(new Atom(circle4, angle, "red", "O"));
  		atoms.push(new Atom(circle5, angle, "red", "O"));
  		atoms.push(new Atom(circle6, angle, "blue", "H"));
  		atoms.push(new Atom(circle7, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "H₂SO₄");

  		this.molecules.push(molecule);

  	}else if(type === 6){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 30);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-44, y+32), 25);
  		var circle3 = new SAT.Circle(new SAT.Vector(x+44, y+32), 25);
  		var circle4 = new SAT.Circle(new SAT.Vector(x, y-55), 25);
  		var circle5 = new SAT.Circle(new SAT.Vector(x+68, y), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "orange", "N"));
  		atoms.push(new Atom(circle2, angle, "red", "O"));
  		atoms.push(new Atom(circle3, angle, "red", "O"));
  		atoms.push(new Atom(circle4, angle, "red", "O"));
  		atoms.push(new Atom(circle5, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "HNO₃");

  		this.molecules.push(molecule);

  	}else if(type === 7){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 40);
  		var circle2 = new SAT.Circle(new SAT.Vector(x+68, y), 30);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "#9ACD32", "Na"));
  		atoms.push(new Atom(circle2, angle, "tan", "Cl"));

  		var molecule = new Molecule(atoms, "NaCl");

  		this.molecules.push(molecule);

  	}else if(type === 8){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 25);
  		var circle2 = new SAT.Circle(new SAT.Vector(x+48, y), 25);
  		var circle3 = new SAT.Circle(new SAT.Vector(x-30, y+25), 15);
  		var circle4 = new SAT.Circle(new SAT.Vector(x+78, y-25), 15);

  		atoms.push(new Atom(circle1, angle, "red", "O"));
  		atoms.push(new Atom(circle2, angle, "red", "O"));
  		atoms.push(new Atom(circle3, angle, "blue", "H"));
  		atoms.push(new Atom(circle4, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "H₂O₂");

  		this.molecules.push(molecule);

  	}else if(type === 9){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 28);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-48, y), 25);
  		var circle3 = new SAT.Circle(new SAT.Vector(x+48, y), 25);

  		atoms.push(new Atom(circle1, angle, "brown", "C"));
  		atoms.push(new Atom(circle2, angle, "red", "O"));
  		atoms.push(new Atom(circle3, angle, "red", "O"));

  		var molecule = new Molecule(atoms, "CO₂");

  		this.molecules.push(molecule);

  	}else if(type === 10){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 30);
  		var circle2 = new SAT.Circle(new SAT.Vector(x+44, y), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "tan", "Cl"));
  		atoms.push(new Atom(circle2, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "HCl");

  		this.molecules.push(molecule);

  	}
  }

}



describe("Shot Test", function() {

    var ctx = 0;
    var scr = new Screen(1000, 600);
    var game;

    beforeEach(function(){
        game = new Game(ctx, scr);
    });

     it("testCreateShip", function(){
        game.createShip();
        expect(500).toBe(game.ship.x);
        expect(300).toBe(game.ship.y);
     });

     it("testDoShipMoleculeColision", function(){
        game.createMolecule(1);
        game.doShipMoleculeColision(0);
        expect(game.molecules.length).toBe(0);
        expect(game.lifes).toBe(2);
        expect(game.hasShip).toBe(false);
     });

     it("testDoShipAtomColision", function(){
        var circle1 = new SAT.Circle(new SAT.Vector(5, 5), 30);
        game.aloneAtoms.push(new Atom(circle1, 0, "nah", "nah"));
        game.doShipAtomColision(0);
        expect(game.aloneAtoms.length).toBe(0);
        expect(game.lifes).toBe(2);
        expect(game.hasShip).toBe(false);
     });

});
