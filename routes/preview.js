'use strict';

var SpreadsheetModel = require('../models/spreadsheet'),
    config = require('../config'),
    spreadsheet;

module.exports = function (req, res) {
    if (req.xhr) {
        spreadsheet.get(req.query || {}, function (data) {
            res.send(data);
        });
    } else {
        spreadsheet = new SpreadsheetModel('preview');
        res.render('apps/preview', {
            menu: 'preview'
        });
    }
};