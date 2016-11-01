var $ = require('jquery');
var React = require('react');

var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var AppBar = require('material-ui').AppBar;
var Paper = require('material-ui').Paper;

var RaisedButton = require('material-ui').RaisedButton;


var styles = {
  appBar: {
    marginBottom: '8px'
  },
  button: {
    marginRight: '8px'
  }
};

var Main = React.createClass({
  handleTitle: function(){
    this.props.router.navigate('', {trigger: true});
  },

  render: function() {

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Majestic Thai"
            showMenuIconButton={false}
            onTitleTouchTap={this.handleTitle}
            style={styles.appBar}
          />
          {this.props.children}

          {!this.props.children &&
            (<div>
              <RaisedButton style={styles.button}
                label="place an order"
                href="#/menu"
                secondary={true}

              />
              <RaisedButton style={styles.button}
                label="kitchen"
                href="#/kitchen"

              />
            </div>)
          }
        </div>
      </MuiThemeProvider>
    );


  }
});

module.exports = {
   Main: Main
};
