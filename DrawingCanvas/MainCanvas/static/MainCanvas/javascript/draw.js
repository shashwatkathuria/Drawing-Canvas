document.addEventListener('ReactDOMLoaded', () => {

    // To keep track of whether currently drawing or not
    let isDrawing = false;

    // Variables required for storing drawing data
    let points = [];
    let lines = [];
    let removedPointsandLines = [];
    let removedPoints = []
    let removedLines = []
    let svg = null;

    // JSON Data to be populated on saving drawing
    var savedData = {
        'points' : [],
        'lines' : [],
    }

    // Initializing svg element
    var canvas = document.getElementById("canvas");
    svg = d3.select('#canvas');

    // Drawing on mouse down
    svg.on('mousedown', function(){

        isDrawing = true;
        const mouseCoordinates = d3.mouse(this);
        // Passing coordinates of mouse to draw point function
        // false indicates not to be connected by line as this
        // is the starting point, i.e., only one point
        drawPoint(mouseCoordinates[0], mouseCoordinates[1], false);

    });

    // Not drawing on mouse up
    svg.on('mouseup', () => {

        isDrawing = false;

    });

    // Continuing drawing on mouse move
    svg.on('mousemove', function(){

        // Drawing only if mouse is down, i.e. isDrawing is true,
        if (!isDrawing)
        {
            return;
        }

        const mouseCoordinates = d3.mouse(this);
        // Passing coordinates of mouse to draw point function
        // trfue indicates line to be joined with the previous
        // point already saved in the points array
        drawPoint(mouseCoordinates[0], mouseCoordinates[1], true);

    });

    // Function for drawing points and lines and rendering the same
    function drawPoint(x, y, isConnect){

        // Variables required for drawing
        let thickness = 0;
        let color = "";

        // Getting input value of thickness from respective HTML element
        var thicknessButtons = document.getElementsByClassName("thicknessClass");
        for (var i = 0; i < thicknessButtons.length; i++)
        {
            if(thicknessButtons[i].checked)
            {
                thickness = thicknessButtons[i].value;
            }
        }

        // Getting input value of color from respective HTML element
        var colorButtons = document.getElementsByClassName("colorClass");
        for (var i = 0; i < colorButtons.length; i++)
        {
            if(colorButtons[i].checked)
            {
                color = colorButtons[i].value;
            }
        }

        // Getting color hex value if any is given else color remains
        // the one from above color class
        var colorHexValue = document.getElementById("colorHexValue");
        let tempColor = colorHexValue.value;
        if (tempColor !== "" )
        {
            color = tempColor;
        }

        // Drawing lines if isConnect is true, i.e., the corrdinates passed
        // are any coordinate except the first so as to be able to draw a line
        if (isConnect)
        {
            // Getting previous point
            const previousPoint = points[points.length - 1];

            // Rendering new line connecting current point to previous
            const line = svg.append('line')
                            .attr('x1', previousPoint.attr('cx'))
                            .attr('y1', previousPoint.attr('cy'))
                            .attr('x2', x)
                            .attr('y2', y)
                            .attr('stroke-width', thickness * 2)
                            .style('stroke', color);

            // Saving the new line in lines array
            lines.push(line);
        }

        // Drawing current point
        const point = svg.append('circle')
                         .attr('cx', x)
                         .attr('cy', y)
                         .attr('r', thickness)
                         .style('fill', color);

        points.push(point);

    };

    // Function to erase on clicking erase button
    document.getElementById('eraseButton').onclick = function ()
    {
        // Removing all points and lines

        for (let i = 0; i < points.length; i++)
        {
            // Removing current iteration point and saving
            // it in removed points for future access
            points[i].remove();
            let removedPoint = points[i]
            removedPoints.push(removedPoint)

        }

        for (let i = 0; i < lines.length; i++)
        {
            // Removing current iteration line and saving
            // it in removed points for future access
            lines[i].remove();
            let removedLine = lines[i]
            removedLines.push(removedLine)
        }

    }

    // Function to undo on clicking undo button
    document.getElementById('undoButton').onclick = function ()
    {

        // Undoing last two points
        if (points.length !== 0)
        {
            // Try catch for the case of only 1 point existing
            try
            {
                for ( let i = 0; i < 2; i++)
                {
                    points[points.length - 1].remove();
                    let removedPoint = points.pop();
                    removedPoints.push(removedPoint);
                }
            }
            catch(error)
            {
                // Do nothing
            }
        }

        // Undoing last two lines
        if (lines.length !== 0)
        {
            // Try catch for the case of only 1 line existing
            try
            {
                for (let i = 0; i < 2; i++)
                {
                    lines[lines.length - 1].remove();
                    let removedLine = lines.pop();
                    removedLines.push(removedLine);
                }
            }
            catch(error)
            {
                // Do nothing
            }

        }

    }

    // Function to redo on clicking redo button
    document.getElementById('redoButton').onclick = function()
    {
        // Redoing last line if removed lines exist
        if (removedLines.length !== 0)
        {
            // Getting last removed line and also removing it
            // from removed lines simultaneously
            let latestRemovedLine = removedLines.pop()

            // Extracting its information
            let strokeWidth = latestRemovedLine._groups['0']['0'].attributes['stroke-width'].value
            let strokeColor = latestRemovedLine._groups['0']['0'].style.stroke
            let x1 = latestRemovedLine._groups['0']['0'].x1.animVal.value
            let x2 = latestRemovedLine._groups['0']['0'].x2.animVal.value
            let y1 = latestRemovedLine._groups['0']['0'].y1.animVal.value
            let y2 = latestRemovedLine._groups['0']['0'].y2.animVal.value

            // Drawing it
            const line = svg.append('line')
                            .attr('x1', x1)
                            .attr('y1', y1)
                            .attr('x2', x2)
                            .attr('y2', y2)
                            .attr('stroke-width', strokeWidth)
                            .style('stroke', strokeColor);

            // Pushing the new redo-ed line back into lines array
            lines.push(line);

        }

        // Redoing last point if removed points exist
        if (removedPoints.length !== 0)
        {
            // Getting last removed point and also removing it
            // from removed points simultaneously
            let latestRemovedPoint = removedPoints.pop()
            let cx = latestRemovedPoint._groups['0']['0'].cx.animVal.value
            let cy = latestRemovedPoint._groups['0']['0'].cy.animVal.value
            let r = latestRemovedPoint._groups['0']['0'].r.animVal.value
            let fillColor = latestRemovedPoint._groups['0']['0'].style.fill

            // Drawing it
            const point = svg.append('circle')
                             .attr('cx', cx)
                             .attr('cy', cy)
                             .attr('r', r)
                             .style('fill', fillColor);

            // Pushing the new redo-ed point back into points array
            points.push(point);
        }
    }

    // Function to check the format of the input of hex color value
    function colorHexValueCheck(color)
    {
        // Hex element values array
        let hexValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

        // Hex colors are 6 hex digits long
        if (color.length !== 6)
        {
            return false
        }

        // For loop to check each element
        for (let k = 0; k < color.length ; k++)
        {
            // Continuing to next iteration if correct
            if (color[k] in hexValues)
            {
                continue
            }
            // Else returning false
            else
            {
                return false
            }

        }

        // Returning true in the end if everything is correct
        return true

    }

    // Function to resize the canvas
    function resizeCanvas()
    {

        // Getting window dimensions
        let height = window.innerHeight;
        let width = window.innerWidth;

        // Drawing on the canvas
        canvas.style.width = width;
        canvas.style.height = height;

    }

    // Resizing canvas in the starting of program
    resizeCanvas();

    // Resizing canvas if resize event is triggered at any point of timse
    window.addEventListener("resize", resizeCanvas);

    // Function to save on clicking save button
    document.getElementById('saveDrawingButton').onclick = function ()
    {

        // Saving each point in JSON object
        for (let i = 0; i < points.length; i++)
        {
              // Getting info of each point
              let currentPoint = points[i]
              let cx = currentPoint._groups['0']['0'].cx.animVal.value
              let cy = currentPoint._groups['0']['0'].cy.animVal.value
              let r = currentPoint._groups['0']['0'].r.animVal.value
              let fillColor = currentPoint._groups['0']['0'].style.fill

              // Saving the same inside JSON object's points array
              savedData['points'].push({'x' : cx, 'y' : cy, 'r' : r, 'color' : fillColor})

        }

        // Saving each line in JSON object
        for (let i = 0; i < lines.length; i++)
        {
            // Getting info of each line
            let currentLine = lines[i]
            let strokeWidth = currentLine._groups['0']['0'].attributes['stroke-width'].value
            let strokeColor = currentLine._groups['0']['0'].style.stroke
            let x1 = currentLine._groups['0']['0'].x1.animVal.value
            let x2 = currentLine._groups['0']['0'].x2.animVal.value
            let y1 = currentLine._groups['0']['0'].y1.animVal.value
            let y2 = currentLine._groups['0']['0'].y2.animVal.value

            // Saving the same inside JSON object's lines array
            savedData['lines'].push({'x1' : x1, 'y1' : y1, 'x2' : x2, 'y2' : y2, 'strokeWidth'  :strokeWidth, 'strokeColor' : strokeColor})

        }

        // Submitting JSON Data through POST form to server by clicking button
        document.getElementById('save').click()

    }

    // Function to save drawing by sending JSON of drawing saved to server
    document.getElementById('save').onclick = function()
    {
        // Getting string of JSON object of drawing saved
        document.getElementById('JSONData').value = JSON.stringify(savedData)

        // Going forward with the form and sending post request
        return true
    }

    // Checking if the drawing to be loaded exists
    if (document.getElementById('JSONLoadData') != null)
    {

        // Parsing the loaded drawing from server to a JSON Object
        var loadedData = JSON.parse(JSONLoadData.value)

        // Iterating through all the points in the loaded drawing
        for(let i = 0; i < loadedData['points'].length; i++)
        {
            // Saving the point and drawing the same in the svg canvas
            const point = svg.append('circle')
                             .attr('cx', loadedData['points'][i]['x'])
                             .attr('cy', loadedData['points'][i]['y'])
                             .attr('r', loadedData['points'][i]['r'])
                             .style('fill', loadedData['points'][i]['color']);

            // Pushing the point inside points array
            points.push(point);
        }

        // Iterating through all the lines in the loaded drawing
        for(let i = 0; i < loadedData['lines'].length; i++)
        {
            // Saving the line and drawing the same in the svg canvas
            const line = svg.append('line')
                            .attr('x1', loadedData['lines'][i]['x1'])
                            .attr('y1', loadedData['lines'][i]['y1'])
                            .attr('x2', loadedData['lines'][i]['x2'])
                            .attr('y2', loadedData['lines'][i]['y2'])
                            .attr('stroke-width', loadedData['lines'][i]['strokeWidth'])
                            .style('stroke', loadedData['lines'][i]['strokeColor']);

            // Pushing the line inside lines array
            lines.push(line);
        }

    }

});
