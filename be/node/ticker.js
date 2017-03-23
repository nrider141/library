var util = require('util');
var EventEmitter = require('events');

var Ticker = function()
{
    var me = this;
    setInterval(function()
    {
        me.emit('tick');
    }, 1000);   
};

util.inherits(Ticker, EventEmitter);

var ticker = new Ticker();
var tickListener = function() {
    console.log('Tick');
};
ticker.on('tick', tickListener);