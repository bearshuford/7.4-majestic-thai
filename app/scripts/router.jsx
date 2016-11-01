var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var Main = require('./components/app.jsx').Main;
var Menu = require('./components/menu.jsx').Menu;
var OrderingContainer= require('./components/menu.jsx').OrderingContainer;



var AppRouter = Backbone.Router.extend({

  routes: {
    '':        'index',
    'menu':    'menu',
    'kitchen': 'kitchen'
  },

  index: function(){
    console.log((<Main/>));
    ReactDOM.render(
      (<Main router={this}/>),
      document.getElementById('app')
    );
  },

  menu: function(){
    ReactDOM.render(
      (<Main router={this}><OrderingContainer/></Main>),
      document.getElementById('app')
    );
  },

  kitchen: function(){
    console.log('kitchen');
  }

});

var router = new AppRouter();

module.exports = router;



/*
var Router = React.createClass({
  render: function(){
    return (
      <Router>
        <Route path="/" component={Main}>
          <Route path="menu" component={Menu}/>
        </Route>
      </Router>
    );
  }
});
*/
