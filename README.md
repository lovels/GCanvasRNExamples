# GCanvas React Native Examples

### Update 在 iOS 设备运行
1. 默认本地有 pod 环境，将 Gemfile 中 cocoapods 安装注释
   ```
   # gem 'cocoapods', '~> 1.11', '>= 1.11.2'
   ```
2. `cd ios/` 修改 Podfile 文件如下：
    ```
    platform :ios, '13.0'
    
    pod "GCanvas", :path => "../node_modules/@flyskywhy/react-native-gcanvas/GCanvas.podspec"
    ```
3. 在项目根目录执行 `npm install --legacy-peer-deps --registry https://registry.npm.taobao.org
`
4. `cd ios/` 执行 `pod install`


Examples for [@flyskywhy/react-native-gcanvas](https://github.com/flyskywhy/react-native-gcanvas).

* GIF of [Canvas 2d Demo](https://github.com/flyskywhy/react-native-gcanvas#2d-canvas)

<img src="https://raw.githubusercontent.com/flyskywhy/react-native-gcanvas/master/assets/canvas.gif" width="480">

* GIF of [Zdog](https://codepen.io/clarke-nicol/pen/OezRdM)

<img src="https://raw.githubusercontent.com/flyskywhy/react-native-browser-polyfill/master/assets/zdog-and-tests.gif" width="480">

* GIF of [Webgl 3d Textures](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-3d-textures.html)

<img src="https://raw.githubusercontent.com/flyskywhy/GCanvasRNExamples/master/assets/Webgl3dTextures.gif" width="480">

* GIF of [Webgl Cube Maps](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-cube-maps.html)

<img src="https://raw.githubusercontent.com/flyskywhy/GCanvasRNExamples/master/assets/WebglCubeMaps.gif" width="480">

* GIF of Pixi using pixi.js-legacy@7 (also can easily modify some to use @4 @5 @6 just follow the comments in <https://github.com/flyskywhy/GCanvasRNExamples/blob/master/app/components/Pixi.js>)

<img src="https://raw.githubusercontent.com/flyskywhy/GCanvasRNExamples/master/assets/Pixi.gif" width="480">

* GIF of [babylonjs multiple touches Drag and drop](https://brianzinn.github.io/create-react-app-babylonjs/dragNdrop)

<img src="https://raw.githubusercontent.com/flyskywhy/GCanvasRNExamples/master/assets/BabylonjsDragNDrop.gif" width="480">

* GIF of [babylonjs Non-Declarative](https://brianzinn.github.io/create-react-app-babylonjs/nonDeclarative)

<img src="https://raw.githubusercontent.com/flyskywhy/GCanvasRNExamples/master/assets/BabylonjsNonDeclarative.gif" width="480">

```
npm install --legacy-peer-deps
```

## Android
`npm run android` to generate `android/app/build/outputs/apk/debug/app-debug.apk` for development.

`npm run build-android` to generate `android/app/build/outputs/apk/release/app-release.apk` for production.

`npm run bundle-android` to `android/app/build/outputs/bundle/release/app-release.aab` for production.

## iOS
Run with Xcode.

## Web
`npm run web` for development, then view it at [http://localhost:3000](http://localhost:3000) in web browser.

`npm run build-web` to generate files in `build/` for production to deploy to `https://foo.bar.com/` , and can use `npx http-server@13.0.2 build` to simply test it at [http://127.0.0.1:8080](http://127.0.0.1:8080) in web browser.

`npm run web-fresh` is needed after change files in `node_modules/`, on Windows need `npm run web-clean` + `npm run web` instead.

## Refs
The babylonjs examples are ported from <https://github.com/brianzinn/create-react-app-babylonjs> with few code change like this commit [react -> react-native: `babylonjs Non-Declarative` works well on Android with new version @flyskywhy/react-native-gcanvas support 3d game engine babylonjs](https://github.com/flyskywhy/GCanvasRNExamples/commit/686eb9f).