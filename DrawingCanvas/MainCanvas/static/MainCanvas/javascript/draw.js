document.addEventListener('DOMContentLoaded', () => {

    let isDrawing = false;

    let points = [];
    let lines = [];
    let svg = null;

    svg = d3.select('#canvas')
            .attr('height', window.innerHeight)
            .attr('width', window.innerWidth);

    svg.on('mousedown', function(){

        isDrawing = true;
        const mouseCoordinates = d3.mouse(this);
        drawPoint(mouseCoordinates[0], mouseCoordinates[1], false);

    });

    svg.on('mouseup', () => {

        isDrawing = false;

    });

    svg.on('mousemove', function(){

        if (!isDrawing)
            return;

        const mouseCoordinates = d3.mouse(this);
        drawPoint(mouseCoordinates[0], mouseCoordinates[1], true);

    });

    function drawPoint(x, y, isConnect){

        let thickness = 0;
        var thicknessButtons = document.getElementsByClassName("thicknessClass");
        for (var i = 0; i < thicknessButtons.length; i++) {
            if(thicknessButtons[i].checked)
              thickness = thicknessButtons[i].value;
        }


        if (isConnect)
        {
            const previousPoint = points[points.length - 1];
            const line = svg.append('line')
                            .attr('x1', previousPoint.attr('cx'))
                            .attr('y1', previousPoint.attr('cy'))
                            .attr('x2', x)
                            .attr('y2', y)
                            .attr('stroke-width', thickness * 2)
                            .style('stroke', 'black');

              lines.push(line);
        }

        const point = svg.append('circle')
                         .attr('cx', x)
                         .attr('cy', y)
                         .attr('r', thickness)
                         .style('fill', 'black');

        points.push(point);

    };


});
