'use strict';

module.exports.preview = require('./preview');

module.exports.index = function (req, res) {
    var pathname = req.path.replace('/', '') || 'home';
    res.render('index', {
        title: pathname,
        menu: pathname
    });
}