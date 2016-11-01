var _ = require('underscore');
var $ = require('jquery');
var React    = require('react');
var Backbone = require('backbone');

require('backbone-react-component');

var Card        = require('material-ui').Card;
var CardActions = require('material-ui/Card').CardActions;
var CardHeader  = require('material-ui/Card').CardHeader;
var CardText    = require('material-ui/Card').CardText;

var FlatButton    = require('material-ui').FlatButton;
var RaisedButton  = require('material-ui').RaisedButton;
var IconButton    = require('material-ui').IconButton;

var Chip  = require('material-ui').Chip;
var Badge = require('material-ui').Badge;
var Avatar = require('material-ui').Avatar;

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

var greenA400 = require('material-ui/styles/colors').greenA400;
var transparent = require('material-ui/styles/colors').transparent;


var Order = require('./../models/order.js').Order;
var OrderCollection = require('./../models/order.js').OrderCollection;

var OrderItem = require('./../models/order.js').OrderItem;
var OrderItemCollection = require('./../models/order.js').OrderItemCollection;



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
    marginBottom: '10px',
    minHeight:    '88px'
  },
  cart: {
    width:          '30%',
    position:       'relative',
    paddingBottom:  '36px'
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
  },
  orderButton: {
    position: 'absolute',
    bottom:   '0px',
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
            zDepth={1}
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
        <FoodItem key={i}
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
    var coll = this.props.orderCollection;
    var hasColl = (coll.length > 0);

    var order = coll.map(function(orderItem){
      return(
        <ListItem
          key={orderItem.cid}
          primaryText={orderItem.get('name')}
          secondaryText={orderItem.get('price')}
          rightIconButton={<IconButton onTouchTap={function(){self.props.removeItem(orderItem)}}> <i className="material-icons">delete</i></IconButton>}
        />
       );
     });

     return (
      <Paper style={styles.cart} rounded={false}>
        <List>
          <Subheader>Order</Subheader>
          {order}
          {hasColl && <Divider inset={true} />}
          {hasColl &&
            <ListItem
              primaryText={this.props.orderCollection.total()}
              secondaryText="Total"
              leftAvatar={
                <Avatar color={greenA400} backgroundColor={transparent}>
                  $
                </Avatar>
              }
            />
          }
        </List>

        {hasColl &&
          <RaisedButton style={styles.orderButton}
            label="place order"
            fullWidth={true}
            onTouchTap={this.props.placeOrder}
            />
        }
      </Paper>
    );
   }

});



var OrderingContainer = React.createClass({

  getInitialState: function(){
    var orderCollection = new OrderItemCollection();

    var orderData = JSON.parse(localStorage.getItem('order'));

    orderCollection.add(orderData);

    return {orderCollection: orderCollection}
  },

  addToOrder: function(menuItem){
    var orderCollection = this.state.orderCollection;
    var orderItemData = menuItem.toJSON();

    delete orderItemData.cid;
    orderCollection.add([orderItemData]);

    var orderDataStr = JSON.stringify(orderCollection.toJSON());
    localStorage.setItem('order',orderDataStr);

    this.setState({orderCollection: orderCollection});
  },

  removeItem: function(orderItem){
    var orderCollection = this.state.orderCollection;
    orderCollection.remove(orderItem);

    var orderDataStr = JSON.stringify(orderCollection.toJSON());
    localStorage.setItem('order',orderDataStr);

    this.setState({orderCollection: orderCollection});
  },

  placeOrder: function(){
    var newOrder = new OrderCollection();
    var orderCollection = this.state.orderCollection;

    newOrder.create(orderCollection);
    this.setState({orderCollection: new OrderItemCollection});
  },

  render: function(){
    return(
      <div style={styles.ordering}>
        <Menu
          handleAdd={this.addToOrder}/>
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
