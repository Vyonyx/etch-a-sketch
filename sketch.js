let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Buttton hover effect. Need to omit if button is on dark mode.
const buttons = document.querySelectorAll('.options');
buttons.forEach(element => element.addEventListener('mouseover', () => {
    element.classList.add('hover');
}));
buttons.forEach(element => element.addEventListener('mouseleave', () => {
    element.classList.remove('hover')
}));
buttons.forEach(element => element.addEventListener('mousedown', () => {
    if (element.classList.contains('persistent')) {
        buttons.forEach(element => element.classList.remove('button-click'));
    }
    element.classList.add('button-click');
}));
buttons.forEach(element => element.addEventListener('mouseup', () => {
    if (element.classList.contains('persistent')) return
    element.classList.remove('button-click');
}));

// Total width and height for grid in pixels.
let totalGridDimensions = 350;

// Initial creation of grid.
const pixelGrid = document.createElement('div');
pixelGrid.classList.add('pixel-grid');
pixelGrid.style.width = totalGridDimensions;
pixelGrid.style.height = totalGridDimensions;

// Get & return number of divisions from the input field based on total grid width & height.
function getGridDivs() {
    const divValue = parseInt(document.querySelector('.divisions').value);
    if (isNaN(divValue)) {
        alert('Division amount is not a valid number.')
        return
    }
    return divValue
}

// Calculate individual pixel width and heights.
const gridDivisions = getGridDivs();
let pixelWidth = totalGridDimensions / gridDivisions;
let pixelHeight = totalGridDimensions / gridDivisions;

// Color options for pixels.
function changePixelToBlack(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    e.target.style.backgroundColor = 'black'; }

function changePixelToRainbow(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    const randColorNumber = Math.floor(Math.random() * 16777215).toString(16);
    const randColor = `#${randColorNumber}`;
    e.target.style.backgroundColor = randColor;}

function changePixelToGreyShades(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    const currentGrey = window.getComputedStyle( e.target ,null).getPropertyValue('background-color');
    const firstSplit = currentGrey.split('(')[1];
    const colourValue = firstSplit.split(',')[0];
    let colourNumber = parseInt(colourValue);
    if (colourNumber < 50) return
    colourNumber -= 25;
    newColorCode = `rgb(${colourNumber}, ${colourNumber}, ${colourNumber})`
    e.target.style.backgroundColor = newColorCode;
}

function setActiveColorMode() {
    const activeColorMode = getActiveColorButton();
    const changePixels = pixelGrid.querySelectorAll('.pixel');

    if (activeColorMode === 'Black') {
        changePixels.forEach( function(pixel) {
            pixel.removeEventListener('mouseover', changePixelToRainbow);
            pixel.removeEventListener('mousedown', changePixelToRainbow);
            pixel.removeEventListener('mouseover', changePixelToGreyShades);
            pixel.removeEventListener('mousedown', changePixelToGreyShades);

            pixel.addEventListener('mouseover', changePixelToBlack);
            pixel.addEventListener('mousedown', changePixelToBlack);
        });
    } else if (activeColorMode === 'Rainbow') {
        changePixels.forEach( function(pixel) {
            pixel.removeEventListener('mouseover', changePixelToBlack);
            pixel.removeEventListener('mousedown', changePixelToBlack);
            pixel.removeEventListener('mouseover', changePixelToGreyShades);
            pixel.removeEventListener('mousedown', changePixelToGreyShades);

            pixel.addEventListener('mouseover', changePixelToRainbow);
            pixel.addEventListener('mousedown', changePixelToRainbow);
        });
    } else if (activeColorMode === 'Grey') {
        changePixels.forEach( function(pixel) {
            pixel.removeEventListener('mouseover', changePixelToBlack);
            pixel.removeEventListener('mousedown', changePixelToBlack);
            pixel.removeEventListener('mouseover', changePixelToRainbow);
            pixel.removeEventListener('mousedown', changePixelToRainbow);

            pixel.addEventListener('mouseover', changePixelToGreyShades);
            pixel.addEventListener('mousedown', changePixelToGreyShades);
        });
    }
}

// Create individual pixels that populates the pixel grid.
for (let row = 0; row < gridDivisions; row ++) {
    const pixelRow = document.createElement('div');
    pixelRow.style.display = 'flex';
    for (let i = 0; i < gridDivisions; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.width = `${pixelWidth}px`;
        pixel.style.height = `${pixelHeight}px`;
        pixel.style.backgroundColor = 'rgb(255, 255, 255)';
        pixel.addEventListener('mouseover', setActiveColorMode);
        pixel.addEventListener('mousedown', setActiveColorMode);
        pixelRow.appendChild(pixel);
    }
    pixelGrid.appendChild(pixelRow);
}

const gridContainer = document.querySelector('.grid-container');
gridContainer.appendChild(pixelGrid);

// Reset canvas pixels.
resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', () => {
    const pixelsToReset = pixelGrid.querySelectorAll('.pixel');
    pixelsToReset.forEach(pixel => pixel.style.backgroundColor = 'rgb(255, 255, 255');
});

function getActiveColorButton() {
    buttons.forEach(function(element) {
        if (element.classList.contains('button-click')) {
            colorMode = element.textContent;
        }
    });
    return colorMode
}

setActiveColorMode();