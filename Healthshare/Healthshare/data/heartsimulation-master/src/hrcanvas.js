/**
* Heart Simulation
*
* Heart visualisation canvas
* @class heartSimulation
*
* @package    heathShare - open source project
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
var heartSimulation = function() {

	this.context = {};
	this.selfSpace = document.getElementById("canvasOne");
	this.startCanvasSpace();

};

/**
* sets base canvas visualisation
* @method startCanvasSpace
*
*/
heartSimulation.prototype.startCanvasSpace = function() {
//	theCanvas = this.status.canvasPlace;
	this.context = this.selfSpace.getContext("2d");
	this.context.fillStyle = '#EEEEEE';
	this.context.fillRect(0, 0, this.selfSpace.width, this.selfSpace.height);
	this.context.strokeStyle = '#000000';
	this.context.strokeRect(1,  1, this.selfSpace.width-2, this.selfSpace.height-2);
	this.context.width = window.innerWidth;
	this.context.height = window.innerHeight;
	this.heartGeometry();
};

/**
* Base Geometry of the heart
* @method heartGeometry
*
*/
heartSimulation.prototype.heartGeometry = function() {

	var localthis = this;
	// Pick out the form elements for easy access later
	var x1 = document.querySelector('#x1');
	var x2 = document.querySelector('#x2');
	var y = document.querySelector('#y');
	var color = document.querySelector('#color');

	// Animation function
	function draw(){
	  // clear the canvas
	  localthis.context.clearRect(0, 0, 120, 120);

	  // Wobble the cube using a sine wave
	  var wobble = Math.sin(Date.now()/250)*window.innerHeight/50;

	  // draw the cube
	  drawCube(
	    window.innerWidth/2,
	    window.innerHeight/2 + wobble + y.value/2,
	    Number(x1.value),
	    Number(x2.value),
	    Number(y.value),
	    color.value
	  );

	  requestAnimationFrame(draw);
	}
	draw();

	// Colour adjustment function
	// Nicked from http://stackoverflow.com/questions/5560248
	function shadeColor(color, percent) {
	  color = color.substr(1);
	  var num = parseInt(color, 16),
	    amt = Math.round(2.55 * percent),
	    R = (num >> 16) + amt,
	    G = (num >> 8 & 0x00FF) + amt,
	    B = (num & 0x0000FF) + amt;
	  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
	}

	// Draw a cube to the specified specs
	function drawCube(x, y, wx, wy, h, color) {
	    localthis.context.beginPath();
	    localthis.context.moveTo(x, y);
	    localthis.context.lineTo(x - wx, y - wx * 0.5);
	    localthis.context.lineTo(x - wx, y - h - wx * 0.5);
	    localthis.context.lineTo(x, y - h * 1);
	    localthis.context.closePath();
	    localthis.context.fillStyle = shadeColor(color, -10);
	    localthis.context.strokeStyle = color;
	    localthis.context.stroke();
	    localthis.context.fill();

	    localthis.context.beginPath();
	    localthis.context.moveTo(x, y);
	    localthis.context.lineTo(x + wy, y - wy * 0.5);
	    localthis.context.lineTo(x + wy, y - h - wy * 0.5);
	    localthis.context.lineTo(x, y - h * 1);
	    localthis.context.closePath();
	    localthis.context.fillStyle = shadeColor(color, 10);
	    localthis.context.strokeStyle = shadeColor(color, 50);
	    localthis.context.stroke();
	    localthis.context.fill();

	    localthis.context.beginPath();
	    localthis.context.moveTo(x, y - h);
	    localthis.context.lineTo(x - wx, y - h - wx * 0.5);
	    localthis.context.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
	    localthis.context.lineTo(x + wy, y - h - wy * 0.5);
	    localthis.context.closePath();
	    localthis.context.fillStyle = shadeColor(color, 20);
	    localthis.context.strokeStyle = shadeColor(color, 60);
	    localthis.context.stroke();
	    localthis.context.fill();
	  }



};

/**
* WorkIN to heart
* @method workINheart
*
*/
heartSimulation.prototype.workINheart = function() {


};
