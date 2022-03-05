const buttons = document.querySelectorAll('.options');

buttons.forEach(element => element.addEventListener('mouseover', () => {
    element.classList.add('hover');
}));
buttons.forEach(element => element.addEventListener('mouseleave', () => {
    element.classList.remove('hover')
}));

// let gridDimensions = '500px';

// const pixelGrid = document.createElement('div');
// pixelGrid.classList.add('pixel-grid');
// pixelGrid.style.width = gridDimensions;
// pixelGrid.style.height = gridDimensions;

// const gridDivisions = 20;
// let pixelWidth = parseInt(gridDimensions) / gridDivisions;
// let pixelHeight = parseInt(gridDimensions) / gridDivisions;

// let mouseDown = false;
// document.body.onmousedown = () => (mouseDown = true);
// document.body.onmouseup = () => (mouseDown = false);

// function changeColor(e) {
//     if (e.type === 'mouseover' && !mouseDown) return
//     e.target.style.backgroundColor = 'black';
// }

// // Create individual pixels that populates the pixel grid.
// for (let row = 0; row < gridDivisions; row ++) {
//     const pixelRow = document.createElement('div');
//     pixelRow.style.display = 'flex';
//     for (let i = 0; i < gridDivisions; i++) {
//         const pixel = document.createElement('div');
//         pixel.classList.add('pixel');
//         pixel.style.width = `${pixelWidth}px`;
//         pixel.style.height = `${pixelHeight}px`;
//         pixel.addEventListener('mouseover', changeColor);
//         pixelRow.appendChild(pixel);
//     }
//     pixelGrid.appendChild(pixelRow);
// }

// document.body.appendChild(pixelGrid);