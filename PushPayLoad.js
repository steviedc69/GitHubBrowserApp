'use strict';

var React = require('react-native');
var Moment = require('moment');
var Feed = require('./Feed');
var {
  Text,
  View,
  Image,
  StyleSheet,
  Component,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight,
} = React;

class PushPayLoad extends Component{

  constructor(props){
    super(props)
      console.log(props.pushEvent)
      var ds = new ListView.DataSource({
      rowHasChanged: (r1,r2)=> r1 != r2
    });
    this.state = {
      data : props.data,
      dataSource : ds.cloneWithRows(props.data.payload.commits)
    };
  }
  renderRow(rowData){

    return (

        <View style= {{         
          flex: 1,
          justifyContent: 'center',
          borderColor: '#D7D7D7',
          borderBottomWidth: 1,
          padding: 15,
          paddingTop : 10,
          paddingBottom : 10
          }}>

          <Text>{rowData.sha.substring(0,6)} - {rowData.message}</Text>
        </View>
      )
  }
  renderHeader() {
    <View>
    <Text>Commits</Text>
    </View>
  }


	render() {
      return (
      <View style={{flex:1}}>
        <View style={{
          paddingTop : 80,
          justifyContent : 'flex-start',
          alignItems: 'center'
        }}>
          <Image source={{uri: this.state.data.actor.avatar_url}}
            style = {styles.avatar} />
            <Text style= {styles.timeText}>
            {Moment(this.state.data.created_at).fromNow()}
            </Text>
            <Text>
            {this.state.data.actor.login} pushed to
            </Text>
                        <Text>
            {this.state.data.payload.ref.replace('refs/heads','')} 
            </Text>
            <Text>
            at {this.state.data.repo.name}
            </Text>
            <Text>
            {this.state.data.payload.commits.length} Commits
            </Text>   
      
        </View>
        <ListView
            style={{flex:1,marginTop: 15}}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              renderHeader={this.renderHeader.bind(this)}/>  
    </View> 
        )

        }
  }

      var styles = StyleSheet.create({
      	container : {
      		flex : 1,
      		paddingTop : 80,
          justifyContent: 'flex-start',
          alignItems: 'center'
      	},
        separator: {
          borderColor:'#D7D7D7',
          borderWidth:1,
          marginTop: 15
        },
      	avatar: {
      		width: 120,
      		height: 120,
      		borderRadius: 60
      	},
        timeText : {
          paddingTop: 20,
          paddingBottom : 20,
          fontSize: 20
        },
        row : {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          borderColor: '#D7D7D7',
          borderBottomWidth: 1,
          padding: 10
        }

      });
module.exports = PushPayLoad; 