var Backbone = require('backbone');


var OrderItem = Backbone.Model.extend({
    idAttribute: '_id'
});

var OrderItemCollection = Backbone.Collection.extend({
    model: OrderItem,

    total: function(){
      this.reduce(function(sum, item){
         return sum + parseFloat(item.get('price'));
      }, 0);
   }
});



var Order = Backbone.Collection.extend({
    idAttribute: '_id'
});



module.exports = {
  Order: Order,
  OrderItem: OrderItem,
  OrderItemCollection: OrderItemCollection
};
