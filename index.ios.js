/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var AuthService = require('./AuthService');
var AppContainer = require('./AppContainer');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS,
  AsyncStorage,

} = React;

var Login = require('./Login');

var GitHubBrowser = React.createClass({


componentDidMount: function(){
  console.log('componentDidMount start');
		AuthService.getAuthInfo((err,authInfo)=> {
			this.setState({

				checkingAuth: false,
				isLoggedIn: authInfo != null
			})
		});
	},

 render: function() {
  	if(this.state.checkingAuth){
  		return (
  			<View style={styles.container}>
  				<ActivityIndicatorIOS
  				  animating={true}
  				  color={'#808080'}
  				  size={'large'} />
  			</View>
  				
  			)
  	}


  	if(this.state.isLoggedIn){
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
