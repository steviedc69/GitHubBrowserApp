'use strict';

var React = require('react-native');

var {
  Text,
  View,
  Image,
  StyleSheet,
  Component,
  ProgressBarAndroid,
} = React;

var Tabbar = require('react-native-tabbar');
var Feed = require('./Feed');
var NavigatorA = require('./Navigator');
var PushPayLoad = require('./PushPayLoad');
var Search = require('./Search');
var ChuckNorris = require('./ChuckNorris');
var ImageGesture = require('./ImageGesture');

class AppContainer extends Component{

  constructor(props){
    super(props);
    console.log('init AppContainer');
    this.state = {
      selected : 'Feed'

    }
  }
  componentDidMount()
  {
    console.log('AppContainer did mount');
  }
  onTabItemPress(name)
  {
    console.log('onTabItemPress '+name);
  	this.setState({
  		selected : name
  	})
  }



	render() {
  var feedTab = <View />;
  var searchTab = <View />;
  var chuckTab = <View />;
    if(this.state.selected === 'Feed')
    {

        feedTab = <NavigatorA id='feed' name='Feed' /> ; 

    }
    if(this.state.selected === 'Search')
    {

        searchTab = <NavigatorA id='search' name='Search' /> ; 
    }
    if(this.state.selected === 'Chuck')
    {
        chuckTab = <NavigatorA id='chuck' name='Chuck Norris'/>;
    }
    console.log('Let us render');
          return (
     <View style={{ flex: 1}}>
        <Tabbar selected={this.state.selected}
                onTabItemPress={this.onTabItemPress.bind(this)}
                style={{ backgroundColor: '#F8F8F8' }}
                renderTabComponent={(name,isActive) => (
                  <View
                      style={[
                        { borderTopWidth: 5, justifyContent: 'center', alignItems: 'center', borderColor: 'transparent' }
                      ]}>
                     <Image
                       style={[isActive ? {width : 20, height: 20, tintColor: '#007AFF'} : {width:20, height: 20}]}
                       source={name === 'Feed' ? require('./images/inbox.png') : name === 'Search' ? require('./images/search.png') : require('./images/chuck.gif')}/>
                     
                    <Text style={isActive ? { color: '#007AFF' } : null}>{ name }</Text>

                  </View>
                )}>

          <Tabbar.Item name="Feed" icon='./images/inbox.png'>
          	{feedTab}
          </Tabbar.Item>
       <Tabbar.Item name="Search" icon='./images/search.png'>
            {searchTab}
          </Tabbar.Item> 
        <Tabbar.Item name="Chuck">
          {chuckTab}
         </Tabbar.Item>
         </Tabbar>

      </View>
    )

  }
}



var styles = StyleSheet.create({

welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFC'
  }

})

module.exports = AppContainer;
