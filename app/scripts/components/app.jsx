var $ = require('jquery');
var React = require('react');

var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var AppBar = require('material-ui').AppBar;
var Paper = require('material-ui').Paper;

var RaisedButton = require('material-ui').RaisedButton;


const styles = {
  app: {

  },
  appBar: {
    marginBottom: '8px'
  }
};

var Main = React.createClass({

  render: function() {

    console.log('main');
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Majestic Thai"
            showMenuIconButton={false}
            style={styles.appBar}
          />
          {this.props.children}

          {!this.props.children &&
            <RaisedButton
              label="place an order"
              href="#/menu"
              secondary={true}
              fullWidth={true}
            />
}
        </div>
      </MuiThemeProvider>
    );


  }
});

module.exports = {
   Main: Main
};
