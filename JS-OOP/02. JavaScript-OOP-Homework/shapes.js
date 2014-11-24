'use strict';

Object.prototype.extends = function (parent) {
    if (!Object.create) {
        Object.prototype.create = function (proto) {
            function F() {
            }

            F.prototype = proto;
            return new F;
        };
    }

    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
};

var shapes = (function () {
    var Shape = (function () {
        function Shape(x, y, color) {
            if (x < 0) {
                throw new Error('X coordinate can not be negative!');
            }

            this._x = x;

            if (y < 0) {
                throw new Error('Y coordinate can not be negative!');
            }

            this._y = y;

            if (!isValidHexColor(color)) {
                throw new Error('Color is invalid!');
            }

            this._color = color;
            this._canvas = document.getElementById('shapesField').getContext('2d');
        }

        // check color is valid
        function isValidHexColor(hexColor) {
            hexColor = hexColor.substr(1);
            var isValid = hexColor.length === 6
                && !isNaN(parseInt(hexColor, 16));

            return isValid;
        }

        Shape.prototype = {
            toString: function () {
                return 'X: ' + this._x + ', Y: ' + this._y + ', Color: ' + this._color;
            },

            draw: function () {
                this._canvas.beginPath();

                if (this instanceof Circle) {
                    this._canvas.arc(this._x, this._y, this._radius, 0, 2 * Math.PI, false);
                }

                if (this instanceof  Rectangle) {
                    this._canvas.rect(this._x, this._y, this._width, this._heigth);
                }

                if (this instanceof Triangle) {
                    this._canvas.moveTo(this._x, this._y);
                    this._canvas.lineTo(this._x2 + this._x, this._y2 + this._y);
                    this._canvas.lineTo(this._x3 + this._x, this._y3 + this._y);
                }

                if (this instanceof Segment) {
                    this._canvas.moveTo(this._x, this._y);
                    this._canvas.lineTo(this._x2 + this._x, this._x2 + this._y);
                }

                if (this instanceof Point) {
                    this._canvas.fillRect(this._x, this._y, 5, 5);
                }

                this._canvas.fillStyle = this._color;
                this._canvas.fill();
                this._canvas.lineWidth = 2;
                this._canvas.strokeStyle = '#003300';
                this._canvas.stroke();
            }
        };

        return Shape;
    }());

    var Circle = (function () {
        function Circle(x, y, color, radius) {
            Shape.call(this, x, y, color);
            if (radius <= 0) {
                throw new Error('Radius can not be zero or negative!');
            }

            this._radius = radius;
        }

        Circle.extends(Shape);

        Circle.prototype = {
            toString: function () {
                return Shape.prototype.toString.call(this) + ', Radius: ' + this._radius;
            },

            draw: function () {
                if (!isInCanvasRange(this._x, this._y, this._radius, this._canvas)) {
                    throw new Error('Drawing the circle is outside the canvas!');
                }

                Shape.prototype.draw.call(this);
            }
        };

        function isInCanvasRange(x, y, radius, canvas) {
            if (x + radius > canvas.canvas.width ||
                y + radius > canvas.canvas.height||
                x - radius < 0 ||
                y - radius < 0){
                return false;
            }

            return true;
        }

        return Circle;
    }());

    var Rectangle = (function () {
        function Rectangle(x, y, color, width, height) {
            Shape.call(this, x, y, color);
            if (width <= 0) {
                throw new Error('Width can not be zero or negative!');
            }

            this._width = width;

            if (height <= 0) {
                throw new Error('Heigth can not be zero or negative!');
            }

            this._heigth = height;
        }

        Rectangle.extends(Shape);

        Rectangle.prototype = {
            toString: function () {
                return Shape.prototype.toString.call(this) + ', Width: ' + this._width +
                    ', Height: ' + this._heigth;
            },

            draw: function () {
                if (!isInCanvasRange(this._x, this._y, this._width, this._heigth, this._canvas)) {
                    throw new Error('Drawing the rectangle is outside the canvas!');
                }

                Shape.prototype.draw.call(this);
            }
        };

        function isInCanvasRange(x, y, width, height, canvas) {
            if (x + width > canvas.canvas.width ||
                y + height > canvas.canvas.height) {
                return false;
            }

            return true;
        }

        return Rectangle;
    }());

    var Triangle = (function () {

        function Triangle(x, y, color, x2, y2, x3, y3) {
            if (!isValidTriangle(x, y, x2, y2, x3, y3)) {
                throw new Error('Can not create triangle with these coordinates!');
            }

            Shape.call(this, x, y, color);
            this._x2 = x2;
            this._y2 = y2;
            this._x3 = x3;
            this._y3 = y3;
        }

        Triangle.extends(Shape);

        Triangle.prototype = {
            toString: function () {
                return Shape.prototype.toString.call(this) +
                    ', X2: ' + this._x2 + ', Y2:' + this._y2 +
                    ', X3: ' + this._x3 + ', Y3: ' + this._y3;
            },

            draw: function () {
                if (!isInCanvasRange(this._x, this._y, this._x2, this._y2, this._x3, this._y3, this._canvas)) {
                    throw new Error('Drawing the triangle is outside the canvas!');
                }

                Shape.prototype.draw.call(this);
            }
        };

        function isInCanvasRange(x, y, x2, y2, x3, y3, canvas) {
            if (x >= canvas.canvas.width ||
                y >= canvas.canvas.height ||
                x2 >= canvas.canvas.width ||
                y2 >= canvas.canvas.height ||
                x3 >= canvas.canvas.width ||
                y3 >= canvas.canvas.height) {
                return false;
            }

            return true;
        }

        function isValidTriangle(x, y, x2, y2, x3, y3) {
            var sideA = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));
            var sideB = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            var sideC = Math.sqrt((x3 - x) * (x3 - x) + (y3 - y) * (y3 - y));
            if (sideA + sideB > sideC &&
                sideB + sideC > sideA &&
                sideC + sideA > sideB) {
                return true;
            }
            return false;
        }

        return Triangle;
    }());

    var Segment = (function () {
        function Segment(x, y, color, x2, y2) {
            Shape.call(this, x, y, color);

            if (x2 < 0) {
                throw new Error('X2 coordinate can not be negative!');
            }

            this._x2 = x2;

            if (y2 < 0) {
                throw new Error('Y2 coordinate can not be negative!');
            }

            this._y2 = y2;
        }

        Segment.extends(Shape);

        Segment.prototype = {
            toString: function () {
                return Shape.prototype.toString.call(this) + ', X2: ' + this._x2 +
                    ', Y2: ' + this._y2;
            },

            draw: function () {
                if (!isInCanvasRange(this._x, this._y, this._x2, this._y2, this._canvas)) {
                    throw new Error('Drawing the segment is outside the canvas!');
                }

                Shape.prototype.draw.call(this);
            }
        };

        function isInCanvasRange(x, y, x2, y2, canvas) {
            if (x >= canvas.canvas.width ||
                y >= canvas.canvas.height ||
                x2 >= canvas.canvas.width ||
                y2 >= canvas.canvas.height) {
                return false;
            }

            return true;
        }

        return Segment;
    }());

    var Point = (function () {
        function Point(x, y, color) {
            Shape.call(this, x, y, color);
        }

        Point.extends(Shape);

        Point.prototype = {
            toString: function () {
                return Shape.prototype.toString.call(this);
            },

            draw: function () {
                if (!isInCanvasRange(this._x, this._y, this._canvas)) {
                    throw new Error('Drawing the point is outside the canvas!');
                }

                Shape.prototype.draw.call(this);
            }
        };

        function isInCanvasRange(x, y, canvas) {
            if (Number(x) + 5 > canvas.canvas.width ||
                Number(y) + 5 > canvas.canvas.height) {
                return false;
            }

            return true;
        }

        return Point;
    }());

    return {
        Shape: Shape,
        Circle: Circle,
        Rectangle: Rectangle,
        Triangle: Triangle,
        Segment: Segment,
        Point: Point
    }
}());

//var circle = new shapes.Circle(400, 100, '3399FF', 50);
//console.log(circle.toString());
////circle.draw();
//console.log();
//
//var rectangle = new shapes.Rectangle(60, 37.5, 'FF6666', 80, 50);
//console.log(rectangle.toString());
////rectangle.draw();
//console.log();
//
//var triangle = new shapes.Triangle(200, 200, '660066', 200, 40.1, 30.8, 60);
//console.log(triangle.toString());
////triangle.draw();
//console.log();
//
//var segment = new shapes.Segment(230, 150, '33CC33', 55, 90);
//console.log(segment.toString());
////segment.draw();
//console.log();
//
//var point = new shapes.Point(495, 100, '800000');
//console.log(point.toString());
////point.draw();