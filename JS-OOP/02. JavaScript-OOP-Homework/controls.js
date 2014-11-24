function add() {
    var shape = createShape();
    shape.draw();
    document.getElementById('info').value += shape.toString() + '\n';
}

function createShape() {
    var shape;
    var select = document.getElementById("shape");
    var option = select.options[select.selectedIndex].value;

    var x = Number(document.getElementById('x').value);
    var y = Number(document.getElementById('y').value);
    var color = document.getElementById('color').value;

    if (option === 'point') {
        shape = new shapes.Point(x, y, color);
    }

    if (option === 'circle') {
        var radius = Number(document.getElementById('radius').value);

        shape = new shapes.Circle(x, y, color, radius);
    }

    if(option === 'rectangle'){
        var width =  Number(document.getElementById('width').value);
        var height =  Number(document.getElementById('height').value);

        shape = new shapes.Rectangle(x, y, color, width, height);
    }

    if(option === 'triangle'){
        var x2 = Number(document.getElementById('x2').value);
        var y2 = Number(document.getElementById('y2').value);
        var x3 = Number(document.getElementById('x3').value);
        var y3 = Number(document.getElementById('y3').value);

        shape = new shapes.Triangle(x, y, color, x2, y2, x3, y3);
    }

    if(option === 'segment'){
        var x2 = Number(document.getElementById('x2').value);
        var y2 = Number(document.getElementById('y2').value);

        shape = new shapes.Segment(x, y, color, x2, y2);
    }

    return shape;
}