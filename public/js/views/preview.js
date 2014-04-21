'use strict';

var Backbone = require('../libs').Backbone,
    template = require('../../templates/preview.jade');

module.exports = Backbone.View.extend({

    initialize: function (options) {
        this.$el.delegate('tbody td', 'mouseover mouseleave', this.highlight);
        this.$el.delegate('thead th', 'click', this.sort.bind(this));
    },

    render: function (model, data) {
        this.empty();
        this.$('tbody').append(template(data))
        return this;
    },

    empty: function () {
        this.$('tbody').empty();
    },

    highlight: function (e) {
        var $el = $(e.target);
        if (e.type === 'mouseover') {
            $el.parent().addClass("hover");
            $('colgroup').eq($el.index()).addClass('hover');
        } else {
            $el.parent().removeClass("hover");
            $('colgroup').eq($el.index()).removeClass('hover');
        }
    },

    sort: function (e) {
        var $target = $(e.target);

        this.$('thead th').removeClass('sorted');
        $target.addClass('sorted');

        this.model.fetch({data: {
                'orderby': e.target.innerHTML.toLowerCase()
            }
        });
    }

})