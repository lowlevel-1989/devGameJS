var canvas = {};
canvas.background        = document.createElement('canvas');
canvas.backgroundContext = canvas.background.getContext('2d');
canvas.entities          = document.createElement('canvas');
canvas.entitiesContext   = canvas.entities.getContext('2d');
canvas.buffer            = document.createElement('canvas');
canvas.ctx               = canvas.buffer.getContext('2d');

canvas.background.style.position = canvas.entities.style.position = 'absolute';

document.body.appendChild(canvas.background);
document.body.appendChild(canvas.entities);

module.exports = canvas;