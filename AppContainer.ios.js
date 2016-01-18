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
class AppContainer extends Component{

  constructor(props){
    super(props);
    this.state = {
      selectedTab : 'feed'

    }
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
          </TabBarIOS>

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