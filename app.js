'use strict';

var express = require('express'),
    routes = require('./routes'),
    path = require('path'),
    app = express();

// all environments
app.set('port', process.env.PORT || 10372);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({ secret: 'asecretnoonewilleverguess' }));
app.use(express.bodyParser());

app.locals.errors = {};

/**********************/
/* Static Middleware */
/**********************/
var stylus = require('stylus');
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: function compileStylus(str, path) {
        return stylus(str)
            .set('filename', path)
            .set('compress', app.get('env') !== 'development')
            .set('linenos', app.get('env') === 'development')
            .use(require('nib')());
    }
}));

app.use(express.static(__dirname + '/public'));


// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
}

/**********/
/* Routes */
/**********/
app.use(app.router);
app.get('/', routes.index);
app.get('/activity', routes.index);
app.get('/control', routes.index);
app.get('/overview', routes.index);
app.get('/issue', routes.index);
app.get('/profile', routes.index);
app.get('/admin', routes.index);
app.get('/preview', routes.preview);


/**********/
/* Server */
/**********/
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});