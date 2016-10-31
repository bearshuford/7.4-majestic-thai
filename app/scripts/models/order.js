var Backbone = require('backbone');


var OderItem = Backbone.Model.extend({
    defaults: {
      "user_avatar": null,
    },
    idAttribute: '_id'
});

var OrderCollection = Backbone.Collection.extend({
    model: Order
});

module.exports = {
    OrderItem: OrderItem,
    OrderCollection: OrderCollection
};
