'use strict';

var React = require('react-native');
var Feed = require('./Feed')
var {
  Text,
  View,
  Image,
  StyleSheet,
  Component,
  NavigatorIOS
} = React;

class NavigationFeed extends Component{

	constructor(props)
	{
		super(props);
	}

	render(){
		return (

				<NavigatorIOS
				  style={{flex:1}}
				  initialRoute={{
				    title: 'Feed',
				    component: Feed
				  }} />
				
			)
	}
}

module.exports = NavigationFeed;
