var util = require('util');
var events = require("events");
var fs = require('fs');
const inputWork = require('./prepare-input-work.js');
const heartShare = require('./sim-heart.js');

var liveINwork = new inputWork();
var liveSimHeart = new heartShare();
