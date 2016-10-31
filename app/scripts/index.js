var $ = require('jquery');
var Backbone = require('backbone');
require('./router.jsx');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

$(function(){
  Backbone.history.start();
});
