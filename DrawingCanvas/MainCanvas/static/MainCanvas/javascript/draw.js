document.addEventListener('DOMContentLoaded', () => {

    alert('Hello');

    svg = d3.select('#svg');
    let isDrawing = false;
    svg.append('circle')
       .attr('cx', 500)
       .attr('cy', 500)
       .attr('r', 5)
       .style('fill', 'black');

    function drawPoint(){

        if (isDrawing === false)
            return;

        const mouseCoordinates = d3.mouse(this);

        svg.append('circle')
           .attr('cx', mouseCoordinates[0])
           .attr('cy', mouseCoordinates[1])
           .attr('r', 5)
           .style('fill', 'black');
    };

    svg.on('mousedown', () => {
        isDrawing = true;
    });

    svg.on('mouseup', () => {
        isDrawing = false;
    });

    svg.on('mousemove', drawPoint);

});
