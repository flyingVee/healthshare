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
*  settings of amiigo wristband mode, record record frequency etc.
* @method thePump
*
*/
heartShare.prototype.thePump = function() {


};


module.exports = heartShare;
