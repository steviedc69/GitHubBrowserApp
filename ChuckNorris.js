'use strict';
var React = require('react-native')
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  ScrollView

} = React;

var Progress = require('./Progress');
  
var URL = 'http://api.icndb.com/jokes/random/1'
var chuckImages = ['http://allimg.zvstore.com/windows/image/the-chuck-norris-app-4424.png','http://cdnstatic.visualizeus.com/thumbs/fb/ca/illustration,avatar,chucknorris,face,hat,icon-fbca563defa063648dd5871f503101fe_h.jpg','https://grantw.wikispaces.com/file/view/!BoNwerwBWk~$(KGrHqYH-EIEu,VLdC,SBLmoYqWDm!~~_3.jpg/221522432/322x279/!BoNwerwBWk~$(KGrHqYH-EIEu,VLdC,SBLmoYqWDm!~~_3.jpg']
  
  
var ChuckNorris = React.createClass({
  
  getInitialState: function(){			
			return {
        joke: '',
  			number : 0,
  			showProgress : true
      }
	},
    componentDidMount: function(){
      this._refreshData();
    },
    _updateNumber: function(){
      
      if(this.state.number === (chuckImages.length - 1))
      {
        	return 0
      }
      else
      {
        	
          return this.state.number+1
        
      }
      
      
    },
    _refreshData: function(){
    		fetch(URL)
        .then((response) => response.json())
        .then((rjson) => {
        	this.setState({
          	joke: rjson.value[0].joke,
            number: this._updateNumber()
          });
        }).finally(() => {
        	this.setState({
        		showProgress : false
        	});
        });
    },
  render: function() {
  	if(this.state.showProgress)
  	{
  		return(<Progress />);
  	}
  	else
  	{
  		  return (
	<ScrollView
        style = {{ backgroundColor: '#F5FCFF'}}
        automaticallyAdjustContentInsets={false}
        onScroll={() => { console.log('onScroll!'); }}
        scrollEventThrottle={200}>
		<View style={styles.container}>
     <View style={styles.list}>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{ uri: chuckImages[this.state.number]}} />
          <View  style={styles.textContainer}>
            <Text style={styles.title} 
                  numberOfLines={100}>{this.state.joke}</Text>
          </View>
        </View>
    	</View>
      <TouchableHighlight
      	onPress={this._refreshData}>
      <View style={styles.button}>
      	<Image 
      		source={{uri: 'https://cdn4.iconfinder.com/data/icons/meBaze-Freebies/512/reload.png'}}
      		style={{width:50, height:50}}/>
      </View>
          </TouchableHighlight>
      </View>
      </ScrollView>
    );

  	}
  
  }
});

var styles = StyleSheet.create({
  thumb: {
    width: 180,
    height: 180,
    marginTop: 30
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop:20,
    paddingBottom : 30,
    backgroundColor: '#F5FCFF'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'column',
    padding: 10,
    alignItems:'center'
  },
  list: {
    flex: .95,
  	marginTop:30
  },
  container:{
  	flex: 1,
  	padding: 30

  },
  button:{
  	flex: .05,
  	justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius : 30,
    //margin : 30,
    marginBottom: 5,
    backgroundColor: '#48BBEC'
  }
});

module.exports = ChuckNorris;
