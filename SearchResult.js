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
  TouchableHighlight,
} = React;
var Progress = require('./Progress');

class SearchResult extends Component{

  constructor(props){
    super(props)
      console.log(props.searchQuery)

      var ds = new ListView.DataSource({
      rowHasChanged: (r1,r2)=> r1 != r2
    });
    this.state = {
      dataSource : ds.cloneWithRows([]),
      search : props.searchQuery,
      showProgress : true,
      count: 0
    };
  }
  componentDidMount(){
    console.log('componentDidMount');
    this.doSearch();
  }
  doSearch(){
    console.log('doSearch');
    var url = 'https://api.github.com/search/repositories?q='+
      encodeURIComponent(this.state.search);
      fetch(url)
        .then((response)=>response.json())
        .then((responseData)=>{
            console.log(responseData);
          this.setState({
            count: responseData.items.length,
            repositories : responseData.repositories,
            dataSource : this.state.dataSource.cloneWithRows(responseData.items)
          });
        }).finally(()=>{
            console.log('finally should become false now');
            this.setState({
              showProgress : false
            });
          });
  }
  renderRow(rowData){
      
      console.log(rowData);
    return (
      <TouchableHighlight 
        underlayColor = '#ddd'>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>{rowData.full_name}</Text>
          <View style={styles.rowTextContainer}>
            <View style = {styles.repoCell}>
              <Image source={require('./images/star.png')}
              style = {styles.repoCellIcon}></Image>
              <Text style={styles.repoCellLabel}>
                {rowData.stargazers_count}
              </Text>
            </View>

            <View style = {styles.repoCell}>
              <Image source={require('./images/fork.png')}
              style = {styles.repoCellIcon}></Image>
              <Text style={styles.repoCellLabel}>
                {rowData.forks}
              </Text>
            </View>
            <View style = {styles.repoCell}>
              <Image source={require('./images/issues2.png')}
              style = {styles.repoCellIcon}></Image>
              <Text style={styles.repoCellLabel}>
                {rowData.stargazers_count}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
      )
  }


	render() {
    console.log("State to render now : "+this.state.showProgress);
     if(this.state.showProgress){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Progress />
            </View>
          )
      }
      else
      {
        console.log('DataSource =>' + this.state.count);
        if(this.state.count > 0)
        {
        console.log('render screen good');
          return (
            
            <View style = {{flex:1, paddingTop: 80,backgroundColor:'#F8F8F8'}}>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)} />
              </View>
            )

        }
        else
        {
         console.log('render screen not so good');
          return (
            
            <View style = {styles.container}>
              <Text style={styles.rowTitle}>No results for {this.state.search} </Text>
              </View>
            )
        }

      }

        }
  }

      var styles = StyleSheet.create({
      	container : {
      		flex : 1,
      		paddingTop : 80,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#F8F8F8'
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
        rowTitle : {
          fontSize: 20,
          fontWeight : '600'
        },
        rowTextContainer : {
          flex: 1,
          flexDirection: 'row',
          justifyContent : 'space-between',
          marginTop : 20,
          marginBottom : 20
        },
        row : {
          padding: 20,
          borderColor: '#D7D7D7',
          borderBottomWidth: 1,
          backgroundColor: '#fff'
        },
        repoCell: {
          width:50,
          alignItems : 'center'
        },
        repoCellIcon:{
          width: 20,
          height : 20
        },
        repoCellLabel : {
          textAlign : 'center'
        }

      });
module.exports = SearchResult; 