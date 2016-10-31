var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var Main = require('./components/app.jsx').Main;
var Menu = require('./components/menu.jsx').Menu;



var AppRouter = Backbone.Router.extend({

  routes: {
    '':        'index',
    'menu':    'menu',
    'kitchen': 'kitchen'
  },

  index: function(){
    console.log((<Main/>));
    ReactDOM.render(
      (<Main/>),
      document.getElementById('app')
    );
  },

  menu: function(){
    ReactDOM.render(
      (<Main><Menu/></Main>),
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
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var LoginComponent = require('./components/login.jsx').LoginComponent;
var ChatComponent = require('./components/chat.jsx').ChatComponent;
var MessageCollection = require('./models/Message').MessageCollection;

var AppRouter = Backbone.Router.extend({

  routes: {
    '':     'index',
    'chat': 'chat',
  },

  index: function(){
    ReactDOM.render(
      React.createElement(LoginComponent, {router: this}),
      document.getElementById('app')
    );
  },

  chat: function(){
    if(this.model) {this.navigate('', {trigger: true});}



    ReactDOM.render(
      React.createElement(ChatComponent, {model: this.model}),
      document.getElementById('app')
    );
  }

});



module.exports = router;
*/






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
