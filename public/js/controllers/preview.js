'use strict';

var PreviewModel = require('../models/preview'),
    PreviewView = require('../views/preview'),
    previewModel = new PreviewModel(),
    previewView = new PreviewView({
        el: '#viewport',
        model: previewModel
    });

previewModel.on('sync', previewView.render.bind(previewView));
previewModel.fetch();