/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  Navigator,
  Component,
} = React;

var TestTab = require('./TestTab');
var Login = require('./Login');
var AuthService = require('./AuthService');
var AppContainer = require('./AppContainer');
var Progress = require('./Progress');

var GitHubBrowser = React.createClass ({
  
/*componentDidMount: function(){
    console.log('Does this shit works??')
    AuthService.getAuthInfo((err,authInfo)=> {
      this.setState({

        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  },*/

 render: function() {
/*    if(this.state.checkingAuth){
      return (
          <Progress />
          
        )
    }*/


   if(this.state.isLoggedIn){
             console.log('AppContainer should load');
      return(
        
        <AppContainer />

      )
    }
    else
    {
      return (
          <Login onLogin={this.onLogin} />
       
      );
   }


  },
  onLogin: function(){
    console.log('successfully logged in, different view here please');
    this.setState({isLoggedIn : true})
  },
  getInitialState: function(){
    return{
      isLoggedIn: false,
      checkingAuth: true
    }
  }
});


var styles = StyleSheet.create({

welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#F5FCFF',
    paddingTop : 40,
    padding: 10
  }
})


AppRegistry.registerComponent('GitHubBrowser', () => GitHubBrowser);
