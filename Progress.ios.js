
var React = require('react-native');

var {
  Text,
  View,
  Component,
  ActivityIndicatorIOS
} = React;


class Progress extends Component{


	render() {
          return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicatorIOS
          animating={true}
          color={'#808080'}
          size={'large'} /> 
            </View>
            )
      }


  }

module.exports = Progress; 



