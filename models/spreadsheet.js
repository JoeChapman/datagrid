'use strict';

var config = require('../config'),
    request = require('request'),
    querystring = require('querystring');

var Spreadsheet = module.exports = function (name, callback) {
    this.raw = {};
    this.sheet = config.google.spreadsheets[name];
};

Spreadsheet.prototype.request = function (query, callback) {
    query = querystring.stringify(query);
    request({ url: 'https://spreadsheets.google.com/feeds/list/'
        +this.sheet.spreadsheetId+
        '/'
        +this.sheet.worksheetId+
        '/public/full?hl=en_UK&alt=json' + (query ? '&'+query : '')
    }, callback);

};

Spreadsheet.prototype.get = function (query, callback) {

    this.request(query, function(err, result) {
        if (err) {
            return callback(err);
        }
        result = JSON.parse(result.body);

        var entries = result.feed.entry || [];

        this.raw['entries'] = entries.map(function(e1) {
            var e2 = {},
                prop,
                val,
                keys;

            for (prop in e1) {
                val = e1[prop];

                if (typeof val === 'object') {
                    keys = Object.keys(val);

                    if(keys.length === 1 && keys[0] === "$t") {
                        val = val.$t;
                    }
                }

                if (prop.indexOf('gsx$') !== -1) {
                    prop = prop.replace('gsx$', '')
                    e2[prop] = val;
                }

            }
            return e2;

        }.bind(this));

        callback(this.raw);

    }.bind(this));

};