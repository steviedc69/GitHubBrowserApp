
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} = React;

const Tabbar = require('react-native-tabbar');

class Test extends Component {
  constructor(props)
  {
  	super(props);
  }


  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator = {this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#D7D7D7', alignItems: 'center'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }
  renderScene(route, navigator) {

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableHighlight
            onPress={this.gotoNext.bind(this)}>
          <Text style={{color: 'red'}}>Splash hello</Text>
        </TouchableHighlight>
      </View>
    );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'login',
      name: 'login',
    });
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return  (     
    <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          previous
        </Text>
      </TouchableOpacity>);
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
         	Test
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = Test;