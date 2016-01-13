'use strict';

var React = require('react-native');
var SearchResult = require('./SearchResult');
//var Text = React.Text;
var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableHighlight,
  Component
  
} = React;

class Search extends Component{

  constructor(props){
    super(props);
    this.state = {
      searchQuery : ''
      
    }
  }


	render() {
 
		return (


        <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('./images/octocat.png')} />
          <TextInput style={styles.input}
            placeholder= 'Search Query'
            autoCapitalize= 'none'
            autoCorrect={false}
            onChangeText={(text) => this.setState({searchQuery: text})}/>
            <TouchableHighlight style={styles.button} onPress={this.onPressed.bind(this)}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableHighlight>          
        
        </View>

        
			)
	}
  onPressed(){
    console.log('Searching for '+this.state.searchQuery);
    this.props.navigator.push({
      title : 'Search results',
      component : SearchResult,
      passProps : {
        searchQuery : this.state.searchQuery
      }

    });
  }


}

var styles = StyleSheet.create({

	  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop : 110,
    padding: 10
  },
  heading: {

    fontSize: 30,
    marginTop: 10
  },
  button : {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop:15,
    justifyContent: 'center'
  },
  buttonText:{
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  input: {
    height: 60,
    padding: 4,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#48bbec",
    marginTop : 50
  },
  logo: {
    width: 88,
    height: 77
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
  loader: {
    marginTop: 15
  },
  error:{
    color:'red',
    paddingTop : 10,
    fontSize : 15
  }
})

module.exports = Search;
