'use strict';

var React = require('react-native');
var buffer = require('buffer');
//var Text = React.Text;
var authService = require('./AuthService');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Component,
  ProgressBarAndroid,
  ToastAndroid,
  ScrollView
    
  
} = React;

var AsyncStorage = require('react-native').AsyncStorage;

class Login extends Component{

  constructor(props){
    super(props);
    this.state = {

      showProgress:false
    }
  }

  componentDidMount(){

    var uName = AsyncStorage.getItem('username').then((value)=> 
      this.setState({
        username : value
      })
      );
    var pWord = AsyncStorage.getItem('password').then((value)=>

        this.setState({
          password : value

        })
      );
    console.log(this.state.username +' : '+this.state.password);

  }

	render() {
      var errorCtrl = <View />;
      if(this.state.showProgress)
      {
          <ProgressBarAndroid 
              styleAttr='Large'
              animating= {this.state.showProgress} /> 
      }
      if(!this.state.success && this.state.badCredentials)
      {
        errorCtrl = <Text style={styles.error}>
                      Username and password combination did not work
                      </Text>
      }
      if(!this.state.success && this.state.unknownError)
      {
        errorCtrl = <Text style={styles.error}>
                      Something happend, but I do not know what
                      </Text>
      }
      if (!this.state.success && this.state.inputFail && !this.state.inPutCorrect) {

        errorCtrl = <Text style={styles.error}>
                      Username and password need to be filled in correctly
                      </Text>
      }

		return (

	<ScrollView
        style = {{ backgroundColor: '#F5FCFF'}}
        automaticallyAdjustContentInsets={false}
        onScroll={() => { console.log('onScroll!'); }}
        scrollEventThrottle={200}>
<View style = {styles.container}>
          <Image source={require('./images/octocat.png')} 
            style={styles.logo}/>
          <Text style={styles.heading}> GitHub Browser
          </Text>
          <TextInput style={styles.input}
            placeholder= 'GitHub username'
            autoCapitalize= 'none'
            autoCorrect={false}
            defaultValue = {this.state.username}
            autoFocus={true}
            onChangeText={(text) => this.setState({username: text})}/>
           <TextInput style={styles.input}
            placeholder='GitHub password'
            password={true}
            autoFocus={true}
            defaultValue={this.state.password}
            onChangeText={(text) => this.setState({password: text})}/>
            <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableHighlight>   
            {errorCtrl} 
            </View>
      </ScrollView>

        
			)
	}

  onLoginPressed(){

    console.log('username : '+this.state.username+' password: '+this.state.password)
    this.setState({showProgress: true});

    if(this.state.username || this.state.password )
    {
    this.setState({inPutCorrect : true})

    authService.login({
      username : this.state.username,
      password : this.state.password

    },(results)=> {
      this.setState(Object.assign({
        showProgress : false
      },results));
      if(results.success && this.props.onLogin){
        AsyncStorage.setItem('username',this.state.username);
        AsyncStorage.setItem('password',this.state.password);
        ToastAndroid.show('Hello, '+this.state.username+', welcome!!',ToastAndroid.LONG);
        this.props.onLogin();
      }
    })

  }
  else
  {
    console.log('input fails');
    this.setState({
      inputFail: 'unput fail',
      inPutCorrect : false,
      showProgress: false})
  }
}
}

var styles = StyleSheet.create({

	  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop : 40,
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
    marginTop:25,
    justifyContent: 'center'
  },
  buttonText:{
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  input: {
    height: 50,
    marginTop : 25,
    padding: 8,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#48bbec"
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

module.exports = Login;
