

   	<Navigator 
    		style = {styles.toolbar}
    		initialRoute= {{id : 'start', name: 'Start'}}
    		renderScene={this.renderScene.bind(this)}
    		configureScene= {(route) => {
    			if (route.sceneConfig){
    				return route.sceneConfig
    			}
	    			return Navigator.SceneConfigs.FloatFromRight;
				}	
			}/>
		)
  }
  renderScene(route,navigator)
  {
  	var routeId = route.id;
  	if(routeId === 'login')
  	{
  		return(
  		<TestTab 
  			navigator={navigator} />
  			)
  	}
  	if(routeId === 'start')
  	{
  		return(
 			<Test 
 				navigator = {navigator} />
  		)
  	}
  }