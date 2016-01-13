/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry
} = React;

var Login = require('./Login');

var GitHubBrowser = React.createClass({
  render: function() {
    return (
        <Login />
        

    );
  }
});



AppRegistry.registerComponent('GitHubBrowser', () => GitHubBrowser);
