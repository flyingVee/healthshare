var input = function(hr, activity)
{
	simulateInputs = false;
	currentHr = hr;
	currentActivity = activity;
}

var simulateInputs = true;
var currentHr = 0;
var predictedHR = 0;
var currentActivity = 50;
var heartModelSpeed = 1;



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
	this.actualHRDisplay = document.getElementById("actualHRvalue");
	this.drawchart();
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
	this.context.fillStyle = '#f4cccc';
	this.context.fillRect(0, 0, this.selfSpace.width, this.selfSpace.height);
	this.context.strokeStyle = '#f4cccc';
	this.context.strokeRect(0,  0, this.selfSpace.width-2, this.selfSpace.height-2);
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

	var conx1 = document.querySelector('#conx1');
	var conx2 = document.querySelector('#conx2');
	var cony = document.querySelector('#cony');

	// Animation function
	function draw(){
	  // clear the canvas
	  localthis.context.clearRect(0, 0, 0, 0);

	  // Wobble the cube using a sine wave

	  var time1 = Date.now() * heartModelSpeed;
	  var time2 = Date.now() * heartModelSpeed;
	  time2 = time2 + 90;


	  var wobbleOne = Math.sin(time1/150)
	  var wobbleTwo = Math.sin(time2/150)

	  if (wobbleOne < -1 ) {
		  wobbleOne = -1;
	  }

	  if (wobbleOne > 0) {
		  wobbleOne = 0;
	  }

	  var wHeightOne = wobbleOne * window.innerHeight/15;
	  var wHeightTwo = wobbleTwo * window.innerHeight/20;



	  // draw the cube
	  drawCube(
		window.innerWidth/2.3 - 100,
	    window.innerHeight/3 - wHeightTwo + y.value/1 -50,
	    Number(x1.value),
	    Number(x2.value),
	    Number(y.value),
	    color.value
	  );

	  drawCube(
	    window.innerWidth/3 - 100,
	    window.innerHeight/2.6 + y.value/2 - 50,
	    Number(conx1.value),
	    Number(conx2.value),
	    Number(cony.value),
	    color.value
	  );

	  drawCube(
	    window.innerWidth/3.5 - 100,
	    window.innerHeight/2 + wHeightOne + y.value/2 - 50,
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
	    localthis.context.fillStyle = shadeColor(color, -10);
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
	    localthis.context.strokeStyle = shadeColor(color, 150);
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

/**
* WorkIN to heart
* @method drawchart
*
*/

heartSimulation.prototype.drawchart = function () {

	var actualDps = []; // dataPoints
	var simulatedDps = []; // dataPoints
	var activityDps = []; // dataPoints


	var chart = new CanvasJS.Chart("chartContainer", {
		title :{
			//text: "Model Prediction vs Actual Data"
		},
		theme: "light2",
		axisY: {
			includeZero: false
		},
		data: [
			{
				type: "area",
				name: "Activity",
				markerType: "none",
				lineThickness: 0,
				color: "#fff2cc",
				//showInLegend: true,
				dataPoints: activityDps
			},
			{
			type: "spline",
			name: "Actual",
			markerType: "none",
			lineThickness: 5,
			lineColor: "green",
			axisYType: "secondary",
			//showInLegend: true,
			dataPoints: actualDps
		},

		{
			type: "spline",
			name: "Simulated",
			markerType: "none",
			lineThickness: 5,
			lineColor: "red",
			axisYType: "secondary",
			//showInLegend: true,
			dataPoints: simulatedDps
		}]
	});

	var xVal1 = 0;
	var xVal2 = 0;
	var yVal = 100;
	var updateInterval = 1000;
	var dataLength = 1000; // number of dataPoints visible at any point

	var updateChart = function (count) {

		count = count || 1;

		for (var j = 0; j < count; j++) {
			if(simulateInputs) {
				currentHr = currentHr +  Math.round(Math.random() *(5) - 2.5);
			}

			document.getElementById("actualHRvalue").innerHTML = currentHr;
			document.getElementById("actualActivity").style.height = Math.floor((30 - currentActivity) * 7.3 ) + "px" ;

			actualDps.push({
				x: xVal1,
				y: currentHr
			});

			activityDps.push({
				x: xVal1,
				y: currentActivity
			});
			xVal1++;
		}

		for (var j = 0; j < count; j++) {
			if(simulateInputs) {
				predictedHR = predictedHR +  Math.round(Math.random() *(5) - 2.5);
			} else {
				if(currentActivity <= 5) {
					predictedHR = 54;
					heartModelSpeed = 1;
				} else {
					predictedHR = 108;
					heartModelSpeed = 1.5;
				}
			}


			document.getElementById("predictedHRvalue").innerHTML = predictedHR;

			simulatedDps.push({
				x: xVal2,
				y: predictedHR
			});
			xVal2++;
		}

		if (actualDps.length > dataLength) {
			actualDps.shift();
		}

		if (activityDps.length > dataLength) {
			actualDps.shift();
		}


		if (simulatedDps.length > dataLength) {
			simulatedDps.shift();
		}

		chart.render();
	};

	updateChart(1);
	setInterval(function(){updateChart()}, updateInterval);

};
