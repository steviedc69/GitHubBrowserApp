
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
var Search = require('./Search');
class TestTab extends Component {
  constructor(props)
  {
  	super(props);
  	this.state = {
  		selected : 'Test 1'
  		  	}
  }

  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator = {this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5', alignItems: 'center'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }
  onTabItemPress(name){
  	console.log('Tabbar pressed'+name);
  	this.setState({
  		selected : name
  	})

  }

  renderScene(route, navigator) {
    var tab1 = <View />;
    var tab2 = <View />;
    if(this.state.selected === 'Test 1')
    {
      tab1 = <Search message= {'tab 1'} />;
    }
    if(this.state.selected === 'Test 3')
    {
      tab2 = <Search message = {'tab 2'} />;
    }
    return (
      //<View style={{ flex: 1}}>
        <Tabbar selected={this.state.selected}
                onTabItemPress={this.onTabItemPress.bind(this)}
                style={{ borderTopWidth: 1, borderColor: 'hotpink', backgroundColor: 'white' }}
                renderTabComponent={(name, isActive) => (
                  <View
                      style={[
                        { borderTopWidth: 5, justifyContent: 'center', alignItems: 'center' },
                        isActive ? { borderColor: 'hotpink'} : { borderColor: 'transparent' }
                      ]}>
                    <Text style={isActive ? { color: 'hotpink' } : null}>{ name }</Text>
                  </View>
                )}>
          <Tabbar.Item name="Test 1">
            {tab1}
          </Tabbar.Item>
          <Tabbar.Item name="Test 3">
            {tab1}
          </Tabbar.Item>
        </Tabbar>
      //</View>
    )
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

class TestView extends Component{
	render(){
		return (
				<View style={{ 
					position: 'absolute', 
					width: window.width, 
					height: window.height, 
					backgroundColor: this.props.color }} />

			)
	}
}
var styles = StyleSheet.create(
{

})

module.exports = TestTab;
