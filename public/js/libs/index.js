'use strict';

var Backbone = require('backbone'),
    jQuery = require('jquery'),
    $ = jQuery;

window.$ = $;
Backbone.$ = $;

module.exports.$ = jQuery;
module.exports.Backbone = Backbone;