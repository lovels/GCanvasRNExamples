import React from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Engine, Scene } from 'react-native-babylonjs';
import { Vector3, Color3 } from '@babylonjs/core';

// start copy from https://www.babylonjs.com/demos/dragndrop/dragdrop.js
const GROUND_SIZE = 1000;
const validateDrag = (targetPosition) => {
  return Math.max(Math.abs(targetPosition.x), Math.abs(targetPosition.z)) <= (GROUND_SIZE / 2) - 10; // should be -15 for torus
}

function dragNdrop() {
  return (
    <View style={styles.container}>
      <View style={styles.containerSmall}>
          <Engine antialias={true} engineOptions={{preserveDrawingBuffer:true, stencil:true}} canvasId="sample-canvas">
            <Scene clearColor={new Color3(0, 0, 0)}>
            <pointLight name='omni' position={new Vector3(0, 50, 0)} />
            <arcRotateCamera name='camera' alpha={0} beta={0} radius={10} target={Vector3.Zero()} setPosition={[new Vector3(20, 200, 400)]}
              lowerBetaLimit={0.1} upperBetaLimit={(Math.PI / 2) * 0.99} lowerRadiusLimit={150}
            />

            <ground name='ground' width={GROUND_SIZE} height={GROUND_SIZE} subdivisions={1}>
              <standardMaterial name='groundMat' specularColor={Color3.Black()} />
            </ground>

            <sphere name='red' diameter={20} segments={32} position={new Vector3(-100, 10, 0)}>
              <standardMaterial name='redMat' diffuseColor={new Color3(0.4, 0.4, 0.4)} specularColor={new Color3(0.4, 0.4, 0.4)} emissiveColor={Color3.Red()} />
              <pointerDragBehavior dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
            </sphere>

            <box name='green' size={20} position={new Vector3(0, 11, -100)}>
              <standardMaterial name='greenMat' diffuseColor={new Color3(0.4, 0.4, 0.4)} specularColor={new Color3(0.4, 0.4, 0.4)} emissiveColor={Color3.Green()} />
              <pointerDragBehavior dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
            </box>

            <box name='blue' size={20} position={new Vector3(100, 11, 0)}>
              <standardMaterial name='greenMat' diffuseColor={new Color3(0.4, 0.4, 0.4)} specularColor={new Color3(0.4, 0.4, 0.4)} emissiveColor={Color3.Blue()} />
              <pointerDragBehavior dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
            </box>

            <torus name='torus' diameter={30} thickness={10} tesselation={32} position={new Vector3(0, 10, 100)}>
              <standardMaterial name='torusMat' diffuseColor={new Color3(0.4, 0.4, 0.4)} specularColor={new Color3(0.4, 0.4, 0.4)} emissiveColor={Color3.Purple()} />
              <pointerDragBehavior dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
            </torus>
            </Scene>
          </Engine>
      </View>

      <TouchableOpacity
        accessibilityRole={'button'}
        onPress={() =>
          Linking.openURL(
            'https://brianzinn.github.io/create-react-app-babylonjs/dragNdrop',
          )
        }
        style={styles.linkContainer}>
        <Text style={styles.link}>Click me to contrast the Web version</Text>
      </TouchableOpacity>

      <View style={styles.container}>
          <Engine antialias={true} engineOptions={{preserveDrawingBuffer:true, stencil:true}} canvasId="sample-canvas">
            <Scene clearColor={new Color3(0, 0, 0)}>
            <pointLight name='omni' position={new Vector3(0, 50, 0)} />
            <arcRotateCamera name='camera' alpha={0} beta={0} radius={10} target={Vector3.Zero()} setPosition={[new Vector3(20, 200, 400)]}
              lowerBetaLimit={0.1} upperBetaLimit={(Math.PI / 2) * 0.99} lowerRadiusLimit={150}
            />

            <ground name='ground' width={GROUND_SIZE} height={GROUND_SIZE} subdivisions={1}>
              <standardMaterial name='groundMat' specularColor={Color3.Black()} />
            </ground>

            <sphere name='red' diameter={20} segments={32} position={new Vector3(-100, 10, 0)}>
              <standardMaterial name='redMat' diffuseColor={new Color3(0.4, 0.4, 0.4)} specularColor={new Color3(0.4, 0.4, 0.4)} emissiveColor={Color3.Red()} />
              <pointerDragBehavior dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
            </sphere>

            <box name='green' size={20} position={new Vector3(0, 11, -100)}>
              <standardMaterial name='greenMat' diffuseColor={new Color3(0.4, 0.4, 0.4)} specularColor={new Color3(0.4, 0.4, 0.4)} emissiveColor={Color3.Green()} />
              <pointerDragBehavior dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
            </box>

            <box name='blue' size={20} position={new Vector3(100, 11, 0)}>
              <standardMaterial name='greenMat' diffuseColor={new Color3(0.4, 0.4, 0.4)} specularColor={new Color3(0.4, 0.4, 0.4)} emissiveColor={Color3.Blue()} />
              <pointerDragBehavior dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
            </box>

            <torus name='torus' diameter={30} thickness={10} tesselation={32} position={new Vector3(0, 10, 100)}>
              <standardMaterial name='torusMat' diffuseColor={new Color3(0.4, 0.4, 0.4)} specularColor={new Color3(0.4, 0.4, 0.4)} emissiveColor={Color3.Purple()} />
              <pointerDragBehavior dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
            </torus>
            </Scene>
          </Engine>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSmall: {
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
  linkContainer: {
    alignSelf: 'center',
    paddingVertical: 15,
  },
  link: {
    textAlign: 'center',
    fontSize: 18,
    color: 'blue',
  },
});

export default dragNdrop
