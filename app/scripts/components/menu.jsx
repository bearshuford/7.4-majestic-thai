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
var MenuItem    = require('material-ui').MenuItem;



const styles = {
  actions: {
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    textAlign: 'right'
  },
  price: {
    fontSize: 14
  },
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



var MenuItem = React.createClass({


  getInitialState: function(){
    return {
      selectedOption: 1,
      selectedQty: 1
    };
  },


  handleOption: function(e, value) {
    this.setState({selectedOption: value});
  },

  handleQty: function(e, value) {
    this.setState({selectedQty: value});
  },



  render: function(){

    var hasOptions = this.props.hasOptions;

    if(hasOptions){
      var options = _.map(this.props.options, function(option,i){
        console.log('option', i, ':', option);
        return (
          <MenuItem
            value={i+1}
            primaryText={option + i}
            key={this.cid+'-option-'+i} />
        );
      }.bind(this));
    }

    var qty = _.map(_.range(1,10), function(val,i){
      return (
        <MenuItem
          value={val}
          primaryText={val}
          key={this.cid+'-qty-'+i} />
      );
    }.bind(this));

    console.log(qty);

    return (
      <Card>
        <CardHeader
          title={this.props.name}
          subtitle={this.props.details}
          actAsExpander={true}
          showExpandableButton={true}
        />

      <CardActions>
        <Chip style={styles.price}>{this.props.price}</Chip>
      </CardActions>

        <CardActions expandable={true} style={styles.actions} >
          {hasOptions &&
            <SelectField
              value={this.state.selectedOption}
              onChange={this.handleOption}
            >
              {options}
            </SelectField>
          }

          <SelectField
            value={this.state.selectedQty}
            onChange={this.handleQty}
            autoWidth={true}
          >
            {qty}
          </SelectField>


            <FlatButton
              label="add to order"
              primary={true}/>

          </CardActions>

      </Card>
    );
  }
});



var Menu = React.createClass({
  render: function(){
    console.log('~~~MENU~~~');
    var menuArray = _.map(menu, function(item, i){
      var hasOptions = !!item.options;
      return (
        <MenuItem key={i}
          price={'$' + item.price}
          details={item.details}
          name={item.name}
          hasOptions={hasOptions}
          options={item.options}
        />
      );
    });

    return (<div>{menuArray}</div>);
  }
});


module.exports = {
  Menu: Menu
};
