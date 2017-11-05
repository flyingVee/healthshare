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

	//var mydata = JSON.parse(this.getdata());

	//mydata.actual[1];

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
			//document.getElementById("actualActivity").style.height = "25px";

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



/*heartSimulation.prototype.getdata = function () {
return '{"actual": [1], "simulated":[1]}';
//'{"actual":[55,58.42,55,56.03,60.51,65.03,68.29,70.66,67.76,71.92,69.36,67.87,72,71.78,71.69,71.12,72.58,67.61,68.54,68.61,67.83,67.5,67.46,64.86,64.1,63.9,61.1,65.97,62.59,66.43,70.14,70.52,75.25,74.63,72.38,76.3,72.84,71.94,67.13,69.29,71.41,71.6,68.52,71.88,76.22,76.61,80.07,86.65,83.07,66,64.54,69.39,67.21,63.04,63.25,59.9,56.86,55,55,55,55,55,57.18,57.64,61.04,59.05,57.73,60.69,58.6,55.18,58.06,60.1,59.26,56.9,55.89,55,59.61,55,58.72,55.06,55,55,58.47,55.49,56.14,56.42,55.73,58.49,58.26,59.82,57.59,55,58.41,55,59.05,62.39,60.96,59.99,57.44,55,55,55,55,55,55,55,59.79,55,59.01,59.63,55.6,60.41,56.37,55,55,59.02,58.13,58.9,61.67,60.37,58.59,55,55,55,55,55,55.87,58.35,58,57.07,55,55.99,55,55,55,56.45,55,57.16,58.29,61.95,57.11,56.04,55,57.8,58.79,58.53,55.83,60.42,63.05,58.66,58.37,55.14,55,55,56.02,59.48,55.79,60.03,62.63,65.73,68.01,66.85,65.65,60.87,56.99,55,58.42,55,58.12,55,57.91,61.79,60.41,65,61.96,56.98,61.51,64.66,60.64,64.94,60.21,63.75,67.06,65.41,67.71,66.52,67.78,66.29,62.89,63.04,64.91,66.93,63.09,63.22,65.58,64.42,61.67,60.02,62.7,58.37,59.66,58.16,55.07,56.85,58.86,56.42,60.09,60.7,56.1,55,55,55,55.8,55.41,55,59.76,59.8,55.98,55,55,56.37,59.55,59.36,55,55,56.88,55,55,55,58.36,63.07,58.82,58.11,63.07,63.8,67.59,69.02,72.73,72.24,77.03,79.63,84.08,97.51,100.75,88.86,84.83,89.25,98.82,109.2,117.69,122.27,120.7,130.16,141.51,138.34,146.77,150.21,141.9,152.32,148.19,161.86,147.78,136.44,118.45,113.5,101.08,93.82,80.45,80.12,74.8,73.94,71.26,73.85,72.29,71.53,75.79,73.01,76.13,79.73,76.47,73.93,72.22,70.61,69.68,68.05,68.89,66.7,69.15,70.59,68,65.62,63.48,62.81,66.72,71.51,71.82,67.6,68.61,73.43,75.94,79.96,83.37,71.9,72.32,67.77,69.57,74.55,78.47,82.21,90.69,85.6,82.92,67.77,71.57,69.68,73.29,77.06,74.76,76.85,76.88,79.5,75.11,78.28,80.23,82.56,90.91,95.26,92.58,75.59,79.83,83.76,65.02,65.99,68.11,66.21,67.34,69.78,69.44,73.7,71.19,69.37,64.47,61.6,58.68,55.15,55,55,55.4,55,55,55,55,55,59.27,59.12,61.9,63.22,67.9,68.13,65.14,68.67,69.62,65.95,61.02,58.14,55,56.08,60.85,58.8,55,55,55,55,55.66,55,55.31,59.09,60.99,56.72,55,56.36,55.31,55,55,55,55,55,55,55,59.17,55.99,57.4,56.82,55,59.93,58.3,63.1,59.07,61.96,59.29,58.71,60.49,61.82,63.16,60.35,58.24,55.23,55,55.2,58.45,55.93,55,55,55,55,56.3,59.12,55.9,55,55,55,58.52,55,55,56.38,60.71,61.76,59.91,60.93,59.1,58.01,57.15,60.5,59.8,63.36,64.42,66.48,63.36,63.5,60.62,56.41,60.92,57.47,57.39,59.38,61.39,63.36,62.28,63.91,61.78,57.06,60.38,57.22,55,58.78,55,58.13,61.25,61.65,62.32,60.98,56.97,55,59.57,62.86,66.94,70.2,68.64,73.61,69.43,70.98,68.57,66.3,67.66,63.73,66.03,67.7,72.53,72.4,75.3,74.13,74.26,78.57,75.12,78.02,81.95,96.04,114.87,106.39,114.85,100.69,118.63,120.19,104.08,123.17,120.19,128.26,116.02,121.55,113.39,123.41,108.13,104.92,122.64,119.3,101.73,85.88,81.24,88.69,78.97,75.3,78.03,77.22,81.78,96.94,81.54,64.75,64.17,62.2,62.79,58.96,55,56,56.69,59.21,63.18,66.42,69.5,66.08,66,68.14,67.43,71.19,70.03,68.95,64.02,60.16,61.07,63.23,65.03,62.91,66.6,65.95,62.42,62.88,61.98,60.17,56.23,59.01,61.96,61.89,57.45,58.31,59.56,62.68,59.84,60.34,64.9,64.54,65.78,70.5,73.16,73.02,72.41,69.88,71.64,69.21,71.74,76.2,72.84,77.69,79.73,80.05,60.77,65.66,62.65,63.28,63.7,65.07,65.82,65.55,67.33,64.22,66.12,70.23,70.77,74.59,77.15,80.1,92.09,94.64,85.93,69.34,70.52,72.97,77.61,77.92,81.1,98.52,111.75],"simulated":[55,55.73,56.05,56.57,59.94,61.46,62.75,62.74,61.75,59.25,55.69,55,55.11,59.82,61.79,62.14,60.54,57.61,55.26,55,59.7,56.02,59.53,62.56,63.68,63.6,59.7,57.21,59.17,56.19,57.95,60,59.06,58.47,58.17,61.57,60.05,64.02,68.79,65.61,66.74,68.02,70.68,68.38,71.67,75.48,80.17,95.4,84.41,74.46,71.03,76.01,79,78.15,76.31,79.36,80.15,88.62,92.5,88.48,71.78,73.17,72.93,68.48,66.28,70.26,74.84,77.89,76.23,75.57,73.47,70.23,69.59,70.09,74.31,77.73,78.79,76.74,79.6,75.51,76.34,78.84,78.19,82.21,77.25,81.64,65.61,66.16,67.68,68.66,71.6,74.01,71.83,67.85,63.06,66.3,68.59,63.81,59.88,64.61,62.43,63.03,61.35,61.33,62.69,63.1,61.75,60.9,58.7,58.77,62.69,67.45,69.64,68.01,70.56,73.99,72.4,69.51,73.5,70.33,71.93,71.59,74.59,78.81,79.23,76.91,73.38,68.58,71.36,72.32,75.08,74.54,73.21,74.98,70.24,72.67,70.77,66.56,70.05,66,70.37,65.56,69.26,64.52,63.67,67.38,67.26,63.18,59.42,60.37,64.44,66.56,68.75,72.14,70.33,71.94,72.36,75.24,79.41,75.67,71.88,72.81,74.47,73.31,69.23,73.21,73.98,77.13,77.59,75.54,73.66,70.1,66.61,68.92,70.56,74.15,73.2,69.73,74.16,70.74,67.19,64.56,67,69.92,70.59,70.83,68.42,71.15,68.14,66.88,62.4,62.44,65.89,61.63,59.08,59.84,61.8,58.89,55,56.7,56.92,55,55,58.49,58.71,57.74,61.61,58.48,59.86,57.87,55.38,56.42,55,55.05,55.38,58.95,56.5,59.76,57.42,60.95,64.28,60.43,62.15,59.44,63.89,59.72,64.55,66.86,63.36,59.61,62.48,59.08,56.79,56.61,60.66,65.64,64.82,63.8,66.37,69.51,69.04,69.89,71.54,69.03,70.32,73.44,78.12,74.87,78.6,78.57,75.1,79.97,77.76,79.93,84.07,95.71,78.5,76.64,74.26,73.39,77,76.93,81.09,95.62,102.57,119.17,120,103.96,91.01,75.71,75.11,76.25,72.74,69.29,67.13,66.8,66.97,67.77,68.82,72.18,69.05,65.98,67.47,64.84,65.73,70.1300000000001,70.3800000000001,70.9400000000001,66.5900000000001,64.9400000000001,65.7400000000001,68.7,72.8500000000001,70.2200000000001,67.8000000000001,67.8900000000001,70.3100000000001,68.2100000000001,68.1800000000001,67.4100000000001,70.3400000000001,73.9400000000001,74.0500000000001,78.1800000000001,80.2700000000001,95.5800000000001,101.55,101.54,83.8700000000001,86.4900000000001,92.3600000000001,76.9400000000001,78.7200000000001,81.5000000000001,81.2500000000001,98.7600000000001,91.7300000000001,79.5000000000001,74.8200000000001,74.4700000000001,73.9100000000001,77.1200000000001,79.4300000000001,77.2700000000001,74.5700000000001,76.0500000000001,76.4800000000001,74.4800000000001,73.4400000000001,76.9500000000001,77.5100000000001,75.3000000000001,76.4300000000001,76.9700000000001,77.4700000000001,75.9400000000001,73.8000000000001,76.0000000000001,79.5300000000001,74.6400000000001,77.9500000000001,79.3100000000001,81.1500000000001,75.8900000000001,72.6300000000001,67.7200000000001,65.7500000000001,68.3500000000001,66.5500000000001,68.6000000000001,72.2400000000001,70.8800000000001,73.8700000000001,72.5200000000001,75.3300000000001,75.7400000000001,76.1700000000001,78.2800000000001,75.7800000000001,80.0600000000001,65.8000000000001,61.2300000000001,57.6400000000001,55,55,55,55,55,59.08,61.65,59.25,55.75,55.71,55.96,57.01,55.41,60.03,58.45,59.34,63.6,63.91,66.44,65.36,63.65,64.31,61.13,57.27,55,55.52,55,59.93,63.55,66.28,65.75,70.63,74.14,71.72,71.3,67.1,63.2,62.49,62.49,62.44,62.83,59.18,61.45,60.54,64.66,68.71,71.26,66.84,63.96,61.71,57.06,55,58.7,57.93,55,55,55.21,55,56.14,55,55,55.89,59.07,55,55,55,55,55,55,55.87,58.4,61.45,60.31,60.59,60.25,55.43,55,55,55,55.74,57,59.15,58,59.24,58.81,62.39,63.18,67.72,64.1,62.17,59.35,60.26,61.93,63.02,60.48,62.24,65.41,61.89,59.46,58.06,62.45,66.76,65.01,66.69,69.76,69.52,72.17,69.3,72.34,74.65,71.87,71.32,67.68,63.21,63.83,60.95,57.77,58.81,61.52,65.03,69.66,74.16,73.73,77.77,76.92,72.31,74.68,78.32,76.65,72.72,74.07,76.63,75.4,70.57,75.21,74.39,75.9,76.29,79.05,77.05,80.5,75.5,78.56,77.26,75.4,79.98,83.98,73.89,75.72,78.08,79.46,74.84,73.22,69.06,70.51,66.58,70.21,72.6,77.55,77.37,77.49,75.59,74.33,77.29,80.87,99.35,83.91,93.26,105.62,105.33,85.88,87.92,92.88,98.05,94.24,95.91,82.41,89.2,73.14,77.25,79.9,81.35,70.89,74.25,73.83,77.97,80.85,66.34,61.42,61.31,65.16,62.15,65.65,62.75,65,61.63,57.01,61.76,61.34,59.87,63.42,58.95,56.52,59.72,62.78,59.66,57.09,55,55,55,59.05,56.17,58.78,56.77,57.59,58.69,56.35,59.15,58.45,63.33,59.18,60.72,57.33,56.57,55.91,55,59.4,57.31,57.41,59.09,62.42,62.22,60.55,62.45,60.49,61.12,60.51],"datetime":[1509804300,1509804301,1509804302,1509804303,1509804304,1509804305,1509804306,1509804307,1509804308,1509804309,1509804310,1509804311,1509804312,1509804313,1509804314,1509804315,1509804316,1509804317,1509804318,1509804319,1509804320,1509804321,1509804322,1509804323,1509804324,1509804325,1509804326,1509804327,1509804328,1509804329,1509804330,1509804331,1509804332,1509804333,1509804334,1509804335,1509804336,1509804337,1509804338,1509804339,1509804340,1509804341,1509804342,1509804343,1509804344,1509804345,1509804346,1509804347,1509804348,1509804349,1509804350,1509804351,1509804352,1509804353,1509804354,1509804355,1509804356,1509804357,1509804358,1509804359,1509804360,1509804361,1509804362,1509804363,1509804364,1509804365,1509804366,1509804367,1509804368,1509804369,1509804370,1509804371,1509804372,1509804373,1509804374,1509804375,1509804376,1509804377,1509804378,1509804379,1509804380,1509804381,1509804382,1509804383,1509804384,1509804385,1509804386,1509804387,1509804388,1509804389,1509804390,1509804391,1509804392,1509804393,1509804394,1509804395,1509804396,1509804397,1509804398,1509804399,1509804400,1509804401,1509804402,1509804403,1509804404,1509804405,1509804406,1509804407,1509804408,1509804409,1509804410,1509804411,1509804412,1509804413,1509804414,1509804415,1509804416,1509804417,1509804418,1509804419,1509804420,1509804421,1509804422,1509804423,1509804424,1509804425,1509804426,1509804427,1509804428,1509804429,1509804430,1509804431,1509804432,1509804433,1509804434,1509804435,1509804436,1509804437,1509804438,1509804439,1509804440,1509804441,1509804442,1509804443,1509804444,1509804445,1509804446,1509804447,1509804448,1509804449,1509804450,1509804451,1509804452,1509804453,1509804454,1509804455,1509804456,1509804457,1509804458,1509804459,1509804460,1509804461,1509804462,1509804463,1509804464,1509804465,1509804466,1509804467,1509804468,1509804469,1509804470,1509804471,1509804472,1509804473,1509804474,1509804475,1509804476,1509804477,1509804478,1509804479,1509804480,1509804481,1509804482,1509804483,1509804484,1509804485,1509804486,1509804487,1509804488,1509804489,1509804490,1509804491,1509804492,1509804493,1509804494,1509804495,1509804496,1509804497,1509804498,1509804499,1509804500,1509804501,1509804502,1509804503,1509804504,1509804505,1509804506,1509804507,1509804508,1509804509,1509804510,1509804511,1509804512,1509804513,1509804514,1509804515,1509804516,1509804517,1509804518,1509804519,1509804520,1509804521,1509804522,1509804523,1509804524,1509804525,1509804526,1509804527,1509804528,1509804529,1509804530,1509804531,1509804532,1509804533,1509804534,1509804535,1509804536,1509804537,1509804538,1509804539,1509804540,1509804541,1509804542,1509804543,1509804544,1509804545,1509804546,1509804547,1509804548,1509804549,1509804550,1509804551,1509804552,1509804553,1509804554,1509804555,1509804556,1509804557,1509804558,1509804559,1509804560,1509804561,1509804562,1509804563,1509804564,1509804565,1509804566,1509804567,1509804568,1509804569,1509804570,1509804571,1509804572,1509804573,1509804574,1509804575,1509804576,1509804577,1509804578,1509804579,1509804580,1509804581,1509804582,1509804583,1509804584,1509804585,1509804586,1509804587,1509804588,1509804589,1509804590,1509804591,1509804592,1509804593,1509804594,1509804595,1509804596,1509804597,1509804598,1509804599,1509804600,1509804601,1509804602,1509804603,1509804604,1509804605,1509804606,1509804607,1509804608,1509804609,1509804610,1509804611,1509804612,1509804613,1509804614,1509804615,1509804616,1509804617,1509804618,1509804619,1509804620,1509804621,1509804622,1509804623,1509804624,1509804625,1509804626,1509804627,1509804628,1509804629,1509804630,1509804631,1509804632,1509804633,1509804634,1509804635,1509804636,1509804637,1509804638,1509804639,1509804640,1509804641,1509804642,1509804643,1509804644,1509804645,1509804646,1509804647,1509804648,1509804649,1509804650,1509804651,1509804652,1509804653,1509804654,1509804655,1509804656,1509804657,1509804658,1509804659,1509804660,1509804661,1509804662,1509804663,1509804664,1509804665,1509804666,1509804667,1509804668,1509804669,1509804670,1509804671,1509804672,1509804673,1509804674,1509804675,1509804676,1509804677,1509804678,1509804679,1509804680,1509804681,1509804682,1509804683,1509804684,1509804685,1509804686,1509804687,1509804688,1509804689,1509804690,1509804691,1509804692,1509804693,1509804694,1509804695,1509804696,1509804697,1509804698,1509804699,1509804700,1509804701,1509804702,1509804703,1509804704,1509804705,1509804706,1509804707,1509804708,1509804709,1509804710,1509804711,1509804712,1509804713,1509804714,1509804715,1509804716,1509804717,1509804718,1509804719,1509804720,1509804721,1509804722,1509804723,1509804724,1509804725,1509804726,1509804727,1509804728,1509804729,1509804730,1509804731,1509804732,1509804733,1509804734,1509804735,1509804736,1509804737,1509804738,1509804739,1509804740,1509804741,1509804742,1509804743,1509804744,1509804745,1509804746,1509804747,1509804748,1509804749,1509804750,1509804751,1509804752,1509804753,1509804754,1509804755,1509804756,1509804757,1509804758,1509804759,1509804760,1509804761,1509804762,1509804763,1509804764,1509804765,1509804766,1509804767,1509804768,1509804769,1509804770,1509804771,1509804772,1509804773,1509804774,1509804775,1509804776,1509804777,1509804778,1509804779,1509804780,1509804781,1509804782,1509804783,1509804784,1509804785,1509804786,1509804787,1509804788,1509804789,1509804790,1509804791,1509804792,1509804793,1509804794,1509804795,1509804796,1509804797,1509804798,1509804799,1509804800,1509804801,1509804802,1509804803,1509804804,1509804805,1509804806,1509804807,1509804808,1509804809,1509804810,1509804811,1509804812,1509804813,1509804814,1509804815,1509804816,1509804817,1509804818,1509804819,1509804820,1509804821,1509804822,1509804823,1509804824,1509804825,1509804826,1509804827,1509804828,1509804829,1509804830,1509804831,1509804832,1509804833,1509804834,1509804835,1509804836,1509804837,1509804838,1509804839,1509804840,1509804841,1509804842,1509804843,1509804844,1509804845,1509804846,1509804847,1509804848,1509804849,1509804850,1509804851,1509804852,1509804853,1509804854,1509804855,1509804856,1509804857,1509804858,1509804859,1509804860,1509804861,1509804862,1509804863,1509804864,1509804865,1509804866,1509804867,1509804868,1509804869,1509804870,1509804871,1509804872,1509804873,1509804874,1509804875,1509804876,1509804877,1509804878,1509804879,1509804880,1509804881,1509804882,1509804883,1509804884,1509804885,1509804886,1509804887,1509804888,1509804889,1509804890,1509804891,1509804892,1509804893,1509804894,1509804895,1509804896,1509804897,1509804898,1509804899]}';
}*/
