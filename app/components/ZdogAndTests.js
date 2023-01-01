import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GCanvasView} from '@flyskywhy/react-native-gcanvas';
import Zdog from 'zdog';

var isLooping = false;

let isSpinning = null;

// ref to https://codepen.io/clarke-nicol/pen/OezRdM
function main(canvas) {
  let illo = new Zdog.Illustration({
    element: canvas,
    dragRotate: true,
    onDragStart: function() {
      isSpinning = false;
    },
    onDragEnd: function() {
      isSpinning = false;
    },
    zoom: 50,
  });

  var sponge = '#F2CDAC';
  var icing = '#BF4158';
  var jam = '#F25D50';

  let cake = new Zdog.Anchor({
    addTo: illo,
    visible: true,
    rotate: { x: -Zdog.TAU/8, y: -Zdog.TAU/18, },
  });

  let cakeTop = new Zdog.Shape({
    addTo: cake,
    path: [
      { x: 0,    z: -3, },
      { x: 2.2,  z: -2.2, },
      { x: 3,    z: 0, },
      { x: 2.2,  z: 2.2,},
      { x: 0,    z: 3,},
      { x: 0,    z: 0, },
      { x: -2.2, z: 2.2,},
      { x: -3,   z: 0,},
      { x: -2.2, z: -2.2,},
    ],
    stroke: 10 / illo.zoom,
    fill: true,
    color: icing,
    translate: { y: -0.05, },
  });

  let cakeBottom = cakeTop.copy({
    translate: { y: 2, },
    color: sponge,
    stroke: 4 / illo.zoom,
  });

  var sideGroup = new Zdog.Group({
    addTo: cake,
    rotate: { y: -Zdog.TAU/18, },
  });

  let insideLeft = new Zdog.Shape({
    addTo: cake,
    path: [
      { x: -2.2, y: 0.5, z: 2.2,},
      { x: 0,    y: 0.5, z: 0, },
      { x: 0,    y: 2, z: 0, },
      { x: -2.2, y: 2, z: 2.2,},
    ],
    stroke: 1 / illo.zoom,
    fill: true,
    color: sponge,
    backface: false,
    //color: 'red',
  });

  let insideLeftJam = new Zdog.Shape({
    addTo: cake,
    path: [
      { x: -0.25,    y: 0.9, z: 0.5, },
      { x: -2.2, y: 0.9, z: 2.35,},
    ],
    stroke: 10 / illo.zoom,
    color: jam,
  });

  let insideLeftCream = insideLeftJam.copy({
    addTo: cake,
    color: 'white',
    translate: { y: 0.2, },
  });

  let insideRight = new Zdog.Shape({
    addTo: cake,
    path: [
      { x: 0, y: 1, z: 2.95,},
      { x: 0, y: 1, z: 0, },
      { x: 0, y: 2, z: 0, },
      { x: 0, y: 2, z: 2.95,},
    ],
    stroke: 1 / illo.zoom,
    fill: true,
    color: sponge,
    backface: false,
    //color: 'red',
  });

  let insideRightJam = new Zdog.Shape({
    addTo: cake,
    path: [
      { x: -0.25, y: 0.9, z: 0.5, },
      { x: 0, y: 0.9, z: 2.95,},
    ],
    stroke: 10 / illo.zoom,
    color: jam,
  });

  let insideRightCream = insideRightJam.copy({
    addTo: cake,
    color: 'white',
    translate: { y: 0.2, },
  });

  let side = new Zdog.Rect({
    addTo: sideGroup,
    width: 2.4,
    height: 2,
    stroke: 1 / illo.zoom,
    translate: { x: 0.15, y: 1, z: 2.85, },
    color: sponge,
    fill: true,
  });

  let icingLeft = new Zdog.Ellipse({
    addTo: side,
    diameter: 1.2,
    quarters: 2,
    stroke: 4 / illo.zoom,
    color: icing,
    fill: true,
    rotate: { z: Zdog.TAU/4, },
    translate: { x: 0.6, y: -1.02, }
  });

  let icingRight = icingLeft.copy({
    translate: { x: -0.6, y: -1.02, },
  });

  let jamFilling = new Zdog.Shape({
    addTo: side,
    path: [
      { x: -1.15, y: -0.1, z: 0.02,},
      { x: 1.2,   y: -0.1, z: 0, },
    ],
    stroke: 10 / illo.zoom,
    fill: true,
    color: jam,
  });

  let cream = jamFilling.copy({
    color: 'white',
    translate: { y: 0.2, },
  })

  sideGroup.copyGraph({
    rotate: { y: Zdog.TAU/2.25 },
  });

  sideGroup.copyGraph({
    translate: { x: 0.1, z: -0.3, },
    rotate: { y: Zdog.TAU/3.27, },
  });

  sideGroup.copyGraph({
    translate: { x: 0, z: 0, },
    rotate: { y: -Zdog.TAU/3.27, },
  });
  sideGroup.copyGraph({
    translate: { x: -0.025, z: -0.05, },
    rotate: { y: -Zdog.TAU/1.24, },
  });
  sideGroup.copyGraph({
    translate: { x: 0.3, z: 0.1, },
    rotate: { y: Zdog.TAU/1.8, },
  });
  sideGroup.copyGraph({
    translate: { x: -0.1, z: 0.3, },
    rotate: { y: Zdog.TAU/1.24, },
  });

  let ticker = 0;
  let cycleCount = 200;
  // let isSpinning = true;
  isSpinning = true;

  function animate() {
    let progress = ticker / cycleCount;
    let tween = Zdog.easeInOut( progress % 1, 3 );

    if (isSpinning){
      illo.rotate.y = tween * -Zdog.TAU;
    }

    ticker++;

    illo.updateRenderGraph();

    if (!isLooping) {
      return;
    }

    requestAnimationFrame( animate );
  }
  animate();
}

export default class ZdogAndTests extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.state = {
      debugInfo: 'Click me to draw some on canvas',
    };

    // only useful on Android, because it's always true on iOS
    this.isGReactTextureViewReady = true;
  }

  componentDidMount() {
    if (Platform.OS === 'web') {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target.id === 'canvasExample') {
            let {width, height} = entry.contentRect;
            this.onCanvasResize({width, height, canvas: entry.target});
          }
        }
      });
      resizeObserver.observe(document.getElementById('canvasExample'));
    }
  }

  componentWillUnmount() {
    isLooping = false;
    isSpinning = null;
  }

  initCanvas = (canvas) => {
    if (this.canvas) {
      return;
    }

    this.canvas = canvas;
    if (Platform.OS === 'web') {
      // canvas.width not equal canvas.clientWidth but "Defaults to 300" ref
      // to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas,
      // so have to assign again, unless <canvas width=SOME_NUMBER/> in render()
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
    }
  };

  onCanvasResize = ({width, height, canvas}) => {
    canvas.width = width;
    canvas.height = height;
    // this.drawSome();
  };

  drawSome = async () => {
    if (isSpinning !== null) {
      isSpinning = !isSpinning;
      return;
    }

    isLooping = true;

    // On Android, sometimes this.isGReactTextureViewReady is false e.g.
    // navigate from a canvas page into a drawer item page with
    // react-navigation on Android, the canvas page will be maintain
    // mounted by react-navigation, then if you continually call
    // this drawSome() in some loop, it's wasting CPU and GPU,
    // if you don't care about such wasting, you can delete
    // this.isGReactTextureViewReady and related onIsReady.
    if (this.canvas && this.isGReactTextureViewReady) {
      main(this.canvas);
    }
  };

  takePicture = () => {
    if (this.canvas) {
      const data = this.canvas.toDataURL();
      console.warn(data);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.drawSome}>
          <Text style={styles.welcome}>{this.state.debugInfo}</Text>
        </TouchableOpacity>
        {Platform.OS === 'web' ? (
          <canvas
            id={'canvasExample'}
            ref={this.initCanvas}
            style={
              {
                flex: 1,
                width: '100%',
              } /* canvas with react-native-web can't use width and height in styles.gcanvas */
            }
          />
        ) : (
          <GCanvasView
            onCanvasResize={this.onCanvasResize}
            onCanvasCreate={this.initCanvas}
            onIsReady={(value) => (this.isGReactTextureViewReady = value)}
            isGestureResponsible={
              true /* Here is just for example, you can remove this line because default is true */
            }
            isAutoClearRectBeforePutImageData={
              false /* default is false, if you want to be exactly compatible with Web, you can set it to true*/
            }
            devicePixelRatio={
              undefined /* Here is just for example, you can remove this line because default is undefined and means default is PixelRatio.get(), ref to "About devicePixelRatio" below */
            }
            style={styles.gcanvas}
          />
        )}
        <TouchableOpacity onPress={this.takePicture}>
          <Text style={styles.welcome}>Click me toDataURL()</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  gcanvas: {
    flex: 1,
    width: '100%',
    // backgroundColor: '#FF000030', // TextureView doesn't support displaying a background drawable since Android API 24
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});
