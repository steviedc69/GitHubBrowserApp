'use strict';

var React = require('react-native');
var Moment = require('moment');
var PushPayLoad = require('./PushPayLoad');
var Progress = require('./Progress');
var {
  Text,
  View,
  Image,
  StyleSheet,
  Component,
  ListView,
  TouchableHighlight,
} = React;

class Feed extends Component{

  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1,r2)=> r1 != r2
    });
    this.state = {
      dataSource : ds.cloneWithRows([]),
      showProgress : true
    };
  }
  componentDidMount(){
    this.fetchFeed();
  }

  fetchFeed(){
    require('./AuthService').getAuthInfo((err,authInfo)=>{
      var url= 'https://api.github.com/users/'
        +authInfo.user.login
        +'/received_events';
        console.log(url);
        fetch(url, {
          headers: authInfo.header
        })
        .then((response) => response.json())
        .then((responseData)=> {
          var feedItems = responseData.filter((ev) => 
              ev.type == 'PushEvent');
          console.log(feedItems[1].actor.login);
          this.setState({
            dataSource : this.state.dataSource.cloneWithRows(feedItems),
            showProgress : false
          });
        })
    });
  }
  pressRow(rowData)
  {
  	console.log(rowData ? 'There is motherfucking data' : 'there is no motherfucking data')
  	console.log(this.props.navigator ? 'Yes' : 'NO' );
  	this.props.navigator.push({
  		id : 'pushEvent',
  		data: rowData,
  		navigator : this.props.navigator,
  		title: 'Push event',
  		name: 'Push event',
  		component: PushPayLoad,
  		passProps: {
  		
  		data : rowData,
        navigator: this.props.navigator,
        id: 'pushEvent',
        name: 'Push event',

  		}
  		
  	});

  }

  renderRow(rowData){
      console.log(rowData.actor.login);
      return (
      	<TouchableHighlight 
      		onPress={() => this.pressRow(rowData)}
      		underlayColor='#ddd'>
      		<View style = {styles.row}>
      			<Image source = {{uri: rowData.actor.avatar_url}} style={styles.avatar} />
      			<View style={styles.textContainer}>
      				<Text>
      					{Moment(rowData.created_at).fromNow()}
      				</Text>
      				<Text>
      					{rowData.actor.login} pushed to
      				</Text>
      				<Text>
      					{rowData.payload.ref.replace('refs/heads','')}
      				</Text>
      				<Text>
      					at          					
      					<Text style= {{fontWeight: '600'}}>
      					{rowData.repo.name}
      					</Text>
      				</Text>

      			</View>
      		</View>
      		</TouchableHighlight>


      	)
  }


	render() {
      if(this.state.showProgress){
        return (

            <Progress />
          )
      }
      else
      {
          return (
            
            <View style = {{flex:1, paddingTop: 50}}>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)} />
              </View>
            )
      }
        }
      }

      var styles = StyleSheet.create({
      	row : {

      		flex : 1,
      		flexDirection : 'row',
      		padding : 25,
      		borderColor : '#D7D7D7',
      		borderBottomWidth: 1,
      		alignItems: 'center'
      	},
      	avatar: {
      		width: 36,
      		height: 36,
      		borderRadius: 18
      	},
      	textContainer: {
      		paddingLeft: 20
      	}

      });
module.exports = Feed; 