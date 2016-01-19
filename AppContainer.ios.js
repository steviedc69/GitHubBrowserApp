'use strict';

var React = require('react-native');

var {
  Text,
  View,
  Image,
  StyleSheet,
  Component,
  TabBarIOS,
  NavigatorIOS
} = React;

var Feed = require('./Feed');
var NavigationFeed = require('./NavigationFeed');
var PushPayLoad = require('./PushPayLoad');
var Search = require('./Search');
var ChuckNorris = require('./ChuckNorris');
var ImageGesture = require('./ImageGesture');


class AppContainer extends Component{

  constructor(props){
    super(props);
    this.state = {
      selectedTab : 'feed'

    }
  }

  chuckIcon(){
     return (<Image
    style={{width:30,height:30}}
    source={require('./images/chuck.gif')} />);
  }
  

	render() {
          return (
            <TabBarIOS>
              <TabBarIOS.Item 
                title='Feed'
                selected={this.state.selectedTab == 'feed'}
                icon={require('./images/inbox.png')}
                onPress={()=> this.setState({selectedTab: 'feed'})}>
                  <NavigatorIOS
                    style={{flex:1}}
                    initialRoute={{
                      title: 'Feed',
                      component: Feed
                    }} />
                  
            </TabBarIOS.Item>
              <TabBarIOS.Item 
                title='Search'
                selected={this.state.selectedTab == 'search'}
                icon={require('./images/search.png')}
                onPress={()=> this.setState({selectedTab: 'search'})}>
                <NavigatorIOS
                  style={{flex:1}}
                    initialRoute={{
                      title: 'Search',
                      component: Search
                    }} />
            </TabBarIOS.Item>
               <TabBarIOS.Item 
                style={{flex:1}}
                title='Chuck Norris'
                selected={this.state.selectedTab == 'chuck'}
                icon={require('./images/chuck2.gif')}
                onPress={()=> this.setState({selectedTab: 'chuck'})}>
                <NavigatorIOS
                    ref='nav'
                    style={{flex:1}}
                    initialRoute={{
                      title: 'Chuck Norris',
                      component: ChuckNorris,
                      rightButtonTitle: 'Play',
                      onRightButtonPress: this.rightPushed.bind(this)
                    }} />
            </TabBarIOS.Item>
          </TabBarIOS>

        )

  }
  rightPushed(){
    console.log('right pushed '+(this.refs.nav.navigator ? 'null':'yes'));
    this.refs.nav.navigator.push({

      title : 'Move like Chuck',
      name : 'Move like chuck',
      component : ImageGesture,
    })
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