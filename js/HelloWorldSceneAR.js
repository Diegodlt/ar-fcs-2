'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroARImageMaker,
  ViroBox,
  ViroMaterials,
  ViroGeometry,
  ViroConstants,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroPolygon,
  ViroImage,
  ViroAnimations
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Working"
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText 
          text="Go team!"
          scale={[.5, .5, .5]} 
          position={[0, 1.5, -5]} 
          style={styles.helloWorldTextStyle} />
        <ViroBox position={[0, 0, -10]} scale={[.5,.5,.2]} materials={"redArrow"} />
        <ViroBox position={[1, 0, -8]} scale={[.5,.5,.2]} materials={"redArrow"} />
        <ViroBox position={[-2, 0, -5]} scale={[.5,.5,.2]} materials={"redArrow"}/>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

ViroMaterials.createMaterials({
  yellowArrow: {
    diffuseTexture: require('./res/yellow-curved.png'),
  },
  redArrow:{
    diffuseTexture: require('./res/red-arrow.png')
  }
})

ViroAnimations.registerAnimations({
  loopRotate:{properties:{rotateY:"+=45"}, duration:1000}
});

ViroARTrackingTargets.createTargets({
  "targetOne" : {
    source : require('./res/22.jpg'),
    orientation : "Up",
    physicalWidth : 0.1 // real world width in meters
  },
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
