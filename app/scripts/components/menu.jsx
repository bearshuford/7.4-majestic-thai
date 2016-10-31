var _ = require('underscore');
var $ = require('jquery');
var React    = require('react');
var Backbone = require('backbone');

require('backbone-react-component');

var Card        = require('material-ui').Card;
var CardActions = require('material-ui/Card').CardActions;
var CardHeader  = require('material-ui/Card').CardHeader;
var CardText    = require('material-ui/Card').CardText;

var FlatButton = require('material-ui').FlatButton;
var Chip       = require('material-ui').Chip;
var Badge      = require('material-ui').Badge;

var SelectField = require('material-ui').SelectField;
var Menu        = require('material-ui').Menu;
var MenuItem    = require('material-ui').MenuItem;
var Paper       = require('material-ui').Paper;
var FontIcon    = require('material-ui').FontIcon;

var List      = require('material-ui').List;
var ListItem  = require('material-ui').ListItem;
var Divider   = require('material-ui').Divider;
var Subheader = require('material-ui').Subheader;

var FloatingActionButton = require('material-ui').FloatingActionButton;

var Order = require('./../models/order.js').Order;
var OrderItem = require('./../models/order.js').OrderItem;
var OrderItemCollection = require('./../models/order.js').OrderItemCollection;

var IconButton = require('material-ui').IconButton;


const styles = {
  ordering: {
    display:  'flex',
    flexFlow: 'row nowrap'
  },
  menu: {
    width:          '70%',
    display:        'flex',
    flexFlow:       'row wrap',
    justifyContent: 'space-between',
    paddingRight:   '12px',
    alignItems:     'flex-start',
    alignContent:   'flex-start'
  },
  card: {
    position:     'relative',
    width:        '49%',
    marginBottom: '10px'
  },
  cart: {
    width:  '30%'
  },
  addButton: {
    position: 'absolute',
    bottom:   '8px',
    right:    '8px'
  },
  price: {
    position: 'absolute',
    top:      '8px',
    right:    '5px'
  }
};


var menu = [
  {
    'name':     'Curry Catfish',
    'price':    '15.99',
    'details':  'Deep fried fillet catfish boneless with red curry in coconut milk, eggplants, peppers and basil leaves',
    'category': 'specials',
    'options': ['mild','spicy']
  }, {
    'name':     'Curry Mix Seafoods',
    'price':    '19.99',
    'details':  'Shrimps, squids and mussels with red curry, coconut milk, eggplant, tomatoes, pineapple, pepper and basil leaves',
  }, {
    'name':     'Curry Duck',
    'price':    '21.99',
    'details':  'Crispy roasted duck simmered in red curry chili paste, eggplant, coconut milk, tomatoes, pineapple, pepper and basil leaves. Prepared cook by medium spicy or more spicy',
  }, {
    'name':     'Ginger Salmon',
    'price':    '17.99',
    'details':  'Grill salmon with stir fried onions, carrots, celery, mushroom, fresh garlic and ginger sauce',
  }
]







var FoodItem = React.createClass({

  handleAdd: function(){
    console.log('food item handleAdd');
    var orderItem = new OrderItem({
      price:  this.props.price,
      name:   this.props.name
    });

    this.props.handleAdd(orderItem);

  },

  render: function(){
    return (
      <Card style={styles.card}>
        <CardHeader
          title={this.props.name}
          subtitle={this.props.details}
          actAsExpander={false}
          showExpandableButton={false}
        />

      <FlatButton style={styles.price}
            label={'$' + this.props.price}
            secondary={true}/>

          <FloatingActionButton
            mini={true}
            style={styles.addButton}
            onTouchTap={this.handleAdd}
          >
            <i className="material-icons">add</i>
          </FloatingActionButton>

      </Card>
    );
  }
});



var Menu = React.createClass({

  render: function(){
    var menuArray = _.map(menu, function(item, i){
      return (
        <FoodItem key={'menu-item-'+i}
          fakeKey={'menu-item-'+i}
          price={item.price}
          details={item.details}
          name={item.name}
          handleAdd={this.props.handleAdd}
        />
      );
    }.bind(this));

    return (<div style={styles.menu}>{menuArray}</div>);
  }
});





var Cart = React.createClass({

  render: function(){
    var self = this;

    var order = this.props.orderCollection.map(function(orderItem){
      return(
        <ListItem
          key={orderItem.cid}
          primaryText={orderItem.get('name')}
          secondaryText={orderItem.get('price')}
          rightIconButton={<IconButton> <i className="material-icons">delete</i></IconButton>}
        />
       );
     });

     console.log(this.props.orderCollection);
     return (
      <Paper style={styles.cart} rounded={false}>
        <List>
          <Subheader>Order</Subheader>
          {order}

        </List>



        <FlatButton
          style={styles.orderButton}
          onTouchTap={this.props.placeOrder}
          label="place order"
          primary={true}
        />
      </Paper>
    );
   }

});



var OrderingContainer = React.createClass({

  getInitialState: function(){
    var orderCollection = new OrderItemCollection();
    return {orderCollection: orderCollection}
  },

  addToOrder: function(menuItem){
    console.log('addToOrder:', menuItem);
    var orderCollection = this.state.orderCollection;
    var orderItemData = menuItem.toJSON();

    delete orderItemData.cid;
    orderCollection.add([orderItemData]);
    console.log(orderCollection);

    this.setState({orderCollection: orderCollection});
  },

  removeItem: function(){

  },

  placeOrder: function(){
    console.log('placeOrder');
  /*
    var newOrder = new orderModels.Order();
    var orderCollection = this.state.orderCollection;

    newOrder.set({items: orderCollection.toJSON()});

    this.setState({orderCollection: new OrderItemCollection});
  */
  },


  render: function(){
    return(
      <div style={styles.ordering}>
        <Menu handleAdd={this.addToOrder}/>
        <Cart
          placeOrder={this.placeOrder}
          removeItem={this.removeItem}
          orderCollection={this.state.orderCollection}
        />
      </div>
    );
  }
})


module.exports = {
  Menu: Menu,
  OrderingContainer: OrderingContainer
};
