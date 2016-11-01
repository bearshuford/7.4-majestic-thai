var Backbone = require('backbone');


var OrderItem = Backbone.Model.extend({
    idAttribute: '_id'
});

var OrderItemCollection = Backbone.Collection.extend({
    model: OrderItem,

    total: function(){
      return this.reduce(function(sum, item){
         return sum + parseFloat(item.get('price'));
      }, 0);
   }
});



var Order = Backbone.Model.extend({
    idAttribute: '_id'
});

var OrderCollection = Backbone.Collection.extend({
		model: Order,
		url: 'https://tiny-lasagna-server.herokuapp.com/collections/bear-orders'
});



module.exports = {
  Order: Order,
  OrderItem: OrderItem,
	OrderCollection: OrderCollection,
  OrderItemCollection: OrderItemCollection
};
