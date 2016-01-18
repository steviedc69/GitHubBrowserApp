/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  Navigator,
  TouchableOpacity,
} = React;
var Feed = require('./Feed');
var PayLoad = require('./PushPayLoad');
var Search = require('./Search');
var SearchResult = require('./SearchResult');
var ChuckNorris = require('./ChuckNorris');
var ImageGesture = require('./ImageGesture');

class NavigatorFeed extends Component {
  
  constructor(props)
  {
    super(props);
    console.log('NavigatorAndroid '+props.data ? 'yes' : 'no');
  }

  render() {

    return (
      <Navigator
          navigator = {this.props.navigator}
          initialRoute={{id: this.props.id, name: this.props.name}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#F8F8F8',flex:1, alignItems: 'center'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }
  renderScene(route, navigator) {
    var routeId = route.id;
    console.log(route.data ? 'there is motherfucking data' : 'there is no motherfucking data');
    console.log('renderScene '+routeId+' data '+this.props.data+' nav object : '+navigator);
    if (routeId === 'feed') {
      return (
        <Feed
          navigator={navigator} />
      );
    }
    if (routeId === 'chuck')
    {
      return( 
        <ChuckNorris />
        )
    }
    if(routeId === 'search')
    { 
      return(
        <Search 
          navigator={navigator} />);
    }
    if (routeId === 'pushEvent' && route.data) {
      return (
        <PayLoad
          navigator={navigator}
          data = {route.data} />
      );
    }
    if( routeId === 'searchResult')
    {
      return(

          <SearchResult 
            searchQuery = {route.searchQuery} 
            navigator = {navigator} />
        );
    }
    if( routeId === 'imageGesture')
    {
      return(
        <ImageGesture 
          navigator = {navigator} />
          );
    }
    if(routeId === null)
    {
      return (
      <View style={styles.container}>
      <Text>404 page not found</Text>
      </View>
      )
    }

  }

}


var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    
    if(route.id === 'pushEvent')
    {
    return  (     
    <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.pop()}>
        <Text style={{color: '#007AFF', margin: 10,}}>
          Feed
        </Text>
      </TouchableOpacity>);
    }
    if( route.id === 'searchResult')
    {
      return(          
        <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.pop()}>
        <Text style={{color: '#007AFF', margin: 10,}}>
          Search
        </Text>
      </TouchableOpacity>);
    }
    if( route.id === 'imageGesture')
    {
      return(          
        <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.pop()}>
        <Text style={{color: '#007AFF', margin: 10,}}>
          Chuck
        </Text>
      </TouchableOpacity>);
    }
  },
  RightButton(route, navigator, index, navState) {
    if( route.id === 'chuck')
    {
      return(
        <TouchableOpacity style={{flex: 1, justifyContent:'center'}}
        onPress={()=> navigator.push({id : 'imageGesture', name:'Move like Chuck'})}>
        <Text style={{color:'#007AFF', margin: 10,}}>
          Play
          </Text>
          </TouchableOpacity>
        );
    }
    else
    {
      return null
    }
    
  },
  Title(route, navigator, index, navState) {
    return (
      <View style={{flex: 1,alignItems:'center' ,justifyContent: 'center'}}>
        <Text style={{ margin: 10, fontSize: 16, textAlign:'center'}}>
          { route.name }
        </Text>
      </View>
    );
  }
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = NavigatorFeed;