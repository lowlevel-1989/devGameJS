var canvas = {};
canvas.main          = document.createElement('canvas');
canvas.ctx           = canvas.main.getContext('2d');
canvas.buffer        = document.createElement('canvas');
canvas.bufferContext = canvas.buffer.getContext('2d');

canvas.main.style.position = 'absolute';

document.body.appendChild(canvas.main);

module.exports = canvas;