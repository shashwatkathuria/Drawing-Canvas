// 'use strict';
document.addEventListener('ReactDOMLoaded', () => {

    let isDrawing = false;

    let points = [];
    let lines = [];
    let removedPointsandLines = [];
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
        let color = "";
        var thicknessButtons = document.getElementsByClassName("thicknessClass");
        for (var i = 0; i < thicknessButtons.length; i++) {
            if(thicknessButtons[i].checked)
              thickness = thicknessButtons[i].value;
        }
        var colorButtons = document.getElementsByClassName("colorClass");
        for (var i = 0; i < colorButtons.length; i++) {
            if(colorButtons[i].checked)
              color = colorButtons[i].value;
        }

        var colorHexValue = document.getElementById("colorHexValue");
        let tempColor = colorHexValue.value;
        if (tempColor !== "" )
            color = tempColor;



        if (isConnect)
        {
            const previousPoint = points[points.length - 1];
            const line = svg.append('line')
                            .attr('x1', previousPoint.attr('cx'))
                            .attr('y1', previousPoint.attr('cy'))
                            .attr('x2', x)
                            .attr('y2', y)
                            .attr('stroke-width', thickness * 2)
                            .style('stroke', color);

              lines.push(line);
        }

        const point = svg.append('circle')
                         .attr('cx', x)
                         .attr('cy', y)
                         .attr('r', thickness)
                         .style('fill', color);

        points.push(point);

    };

    document.getElementById('eraseButton').onclick = function ()
    {
        for (let i = 0; i < points.length - 1; i++)
        {
            points[i].remove();
        }

        for (let i = 0; i < lines.length - 1; i++)
        {
            lines[i].remove();
        }
    }

    document.getElementById('undoButton').onclick = function ()
    {

        if (points.length !== 0)
        {
            for ( let i = 0; i < 2; i++)
            {
                points[points.length - 1].remove();
                let removedPoint = points.pop();
                removedPointsandLines.push(removedPoint);
            }
        }

        if (lines.length !== 0)
        {
            for (let i = 0; i < 2; i++)
            {
                lines[lines.length - 1].remove();
                let removedLine = lines.pop();
                removedPointsandLines.push(removedLine);
            }
        }

    }

    document.getElementById('redoButton').onclick = function()
    {
        if (removedPointsandLines.length !== 0)
        {
            let removedElement = removedPointsandLines.pop()
            try
            {
              let strokeWidth = removedElement._groups['0']['0'].attributes['stroke-width'].value
              let strokeColor = removedElement._groups['0']['0'].style.stroke
              let x1 = removedElement._groups['0']['0'].x1.animVal.value
              let x2 = removedElement._groups['0']['0'].x2.animVal.value
              let y1 = removedElement._groups['0']['0'].y1.animVal.value
              let y2 = removedElement._groups['0']['0'].y2.animVal.value

              const line = svg.append('line')
                              .attr('x1', x1)
                              .attr('y1', y1)
                              .attr('x2', x2)
                              .attr('y2', y2)
                              .attr('stroke-width', strokeWidth)
                              .style('stroke', strokeColor);

                lines.push(line);
              } catch(TypeError){

                let cx = removedElement._groups['0']['0'].cx.animVal.value
                let cy = removedElement._groups['0']['0'].cy.animVal.value
                let r = removedElement._groups['0']['0'].r.animVal.value
                let fillColor = removedElement._groups['0']['0'].style.fill

                const point = svg.append('circle')
                                 .attr('cx', cx)
                                 .attr('cy', cy)
                                 .attr('r', r)
                                 .style('fill', fillColor);

                points.push(point);
              }
          }
    }

    function colorHexValueCheck(color)
    {
        let hexValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

        if (color.length !== 6)
            return false

        for(var k = 0; k < color.length ; k++)
        {

            if (color[k] in hexValues)
                continue
            else
                return false

        }

        return true

    }

});
