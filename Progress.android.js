
var React = require('react-native');

var {
  Text,
  View,
  ProgressBarAndroid,
  Component,
} = React;




class Progress extends Component{


	render() {
          return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            	<ProgressBarAndroid 
            		styleAttr= {'Large'} />
            </View>
            )
      }


  }

  module.exports = Progress; 




