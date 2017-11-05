/**
*  HeartShare - Computational Simulation of Heart
*
* @class heartShare
*
* @package    HeartShare open source project
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
var util = require('util');
var events = require("events");
var fs = require('fs');

var heartShare = function() {
console.log('SIMULATED HEART PUMPING')
	events.EventEmitter.call(this);


};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(heartShare, events.EventEmitter);

/**
*  work demand ask of heart to serve
* @method inWork
*
*/
heartShare.prototype.inWork = function() {


};

/**
*  equation of pump fluid dynamics
* @method thePump
*
*/
heartShare.prototype.thePump = function() {
  // input volume x y z geometry assumptions

};

/**
*  Nerves Simulation
* @method electricNerves
*
*/
heartShare.prototype.electricNerves = function() {
  // the frequency and voltage of the pump
  // eventually how communication transmit across geometry of the heartShare

};

/**
*
* @method outputFlow
*
*/
heartShare.prototype.outputFlow = function() {
  // the exit velocity of blood, poperties of the viscosity of stuff in it.

};


module.exports = heartShare;
