'use strict';

var React = require('react-native');
var {
  AppRegistry,
  PanResponder,
  StyleSheet,
  View,
  processColor,
  Image,
} = React;

var CIRCLE_SIZE = 80;
var CIRCLE_COLOR = 'blue';
var CIRCLE_HIGHLIGHT_COLOR = 'green';
//var chuckImages = ['http://allimg.zvstore.com/windows/image/the-chuck-norris-app-4424.png','http://cdnstatic.visualizeus.com/thumbs/fb/ca/illustration,avatar,chucknorris,face,hat,icon-fbca563defa063648dd5871f503101fe_h.jpg','https://grantw.wikispaces.com/file/view/!BoNwerwBWk~$(KGrHqYH-EIEu,VLdC,SBLmoYqWDm!~~_3.jpg/221522432/322x279/!BoNwerwBWk~$(KGrHqYH-EIEu,VLdC,SBLmoYqWDm!~~_3.jpg']


var ImageGesture = React.createClass({
  statics: {
    title: 'PanResponder Sample',
    description: 'Shows the use of PanResponder to provide basic gesture handling.',
  },

  _panResponder: {},
  _previousLeft: 0,
  _previousTop: 0,
  _circleStyles: {},
  circle: (null : ?{ setNativeProps(props: Object): void }),
  container: (null: ?{setNativeProps(props: Object):void}),

  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._previousLeft = 20;
    this._previousTop = 84;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop
      }
    };
  },

  componentDidMount: function() {
    this._updatePosition();
  },

  render: function() {
    console.log('render ImageGesture');
    return (
      <View
        ref={(container) =>{
          this.container = container;
        }}
        style={styles.container}>
        <Image
          source={require('./images/chuck.gif')} 
          ref={(circle) => {
            this.circle = circle;
          }}
          style={styles.circle}
          {...this._panResponder.panHandlers}
        />

      </View>
    );
  },

  _highlight: function() {
    const circle = this.circle;
    circle && circle.setNativeProps({
      style: {
        backgroundColor: processColor(CIRCLE_HIGHLIGHT_COLOR)
      }
    });
    const container = this.container;
    container && container.setNativeProps({
      style: {
        backgroundColor: processColor(CIRCLE_COLOR)
      }
    });
  },

  _unHighlight: function() {
    const circle = this.circle;
    circle && circle.setNativeProps({
      style: {
        backgroundColor: processColor(CIRCLE_COLOR)
      }
    });
    const container = this.container;
    container && container.setNativeProps({
      style: {
        backgroundColor: processColor(CIRCLE_HIGHLIGHT_COLOR)
      }
    });
  },

  _updatePosition: function() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  },

  _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user presses down on the circle?
    return true;
  },

  _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user moves a touch over the circle?
    return true;
  },

  _handlePanResponderGrant: function(e: Object, gestureState: Object) {
    this._highlight();
  },
  _handlePanResponderMove: function(e: Object, gestureState: Object) {
    //console.log("HandlePanResponderMove : "+(this._previousLeft+gestureState.dx)+" "+(this._previousTop+gestureState.dx));
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updatePosition();
  },
  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
    console.log("handle pan responder end left : "+this._previousLeft+" top "+this._previousTop);
  },
});

var styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: CIRCLE_COLOR,
    position: 'absolute',
    left: 0,
    top: 0,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: '#F5FCFF'
  },
});

module.exports = ImageGesture;