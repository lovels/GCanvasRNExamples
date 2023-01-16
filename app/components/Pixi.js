import React from 'react';
import {GCanvasView} from '@flyskywhy/react-native-gcanvas';
import {PIXI} from 'react-native-pixi';
import {Asset} from 'expo-asset';

// for game, 1 is more better than PixelRatio.get() to code with physical pixels
const devicePixelRatio = 1;

export default () => {
  const onCanvasCreate = async (canvas) => {
    let context = canvas.getContext('webgl');
    const app = new PIXI.Application({
      context,
      devicePixelRatio,
      backgroundColor: '0x7ed321',
    });

    const imageHttpSrc =
      'https://gw.alicdn.com/tfs/TB1KwRTlh6I8KJjy0FgXXXXzVXa-225-75.png';
    // `await Asset.fromModule` needs `expo-file-system`, and `expo-file-system` needs
    // `expo-modules` or old `react-native-unimodules`.
    // https://github.com/expo/expo/tree/sdk-47/packages/expo-asset said it needs
    // https://docs.expo.dev/bare/installing-expo-modules/ which also described how to
    // migrating from `react-native-unimodules`.
    // The installation of old `react-native-unimodules` can ref to this commit
    // [expo -> react-native: add react-native-unimodules]
    // (https://github.com/flyskywhy/snakeRN/commit/90983816de3ad2a4da47ffa0f6d1659c2688be3e).
    let imageRequireAsset = await Asset.fromModule(
      require('@flyskywhy/react-native-gcanvas/tools/build_website/assets/logo-gcanvas.png'),
    );
    let spriteHttpLoader;
    let spriteRequireLoader;

    // you can see how to use PIXI.loader in it
    spriteByResourceLoader();

    // or, use new Image() not PIXI.loader in it
    // spriteByNewImage();

    // or, just use PIXI.Sprite.from() in it
    // spriteByFrom();

    function spriteByResourceLoader() {
      // ref to [Pixi教程](https://github.com/Zainking/learningPixi)
      PIXI.loader.add(imageHttpSrc); // imageHttpSrc can be simple string url
      PIXI.loader
        .add({
          url: imageRequireAsset.uri,
          // imageRequireAsset must set loadType in this object when build release
          //
          // if 'node_modules/resource-loader' is which pixi.js depends on, then
          // loadType: require('resource-loader').Loader.Resource._loadTypeMap[imageRequireAsset.type],
          // if 'node_modules/pixi.js/node_modules/resource-loader' is which pixi.js depends on, then
          loadType: require('pixi.js/node_modules/resource-loader').Loader.Resource._loadTypeMap[imageRequireAsset.type],
        })
        .load(setup);

      function setup(loader, resources) {
        spriteHttpLoader = new PIXI.Sprite(
          PIXI.loader.resources[imageHttpSrc].texture,
        );

        app.stage.addChild(spriteHttpLoader);
        spriteHttpLoader.y = 700;

        spriteRequireLoader = new PIXI.Sprite(
          PIXI.loader.resources[imageRequireAsset.uri].texture,
        );
        app.stage.addChild(spriteRequireLoader);

        spriteRequireLoader.x = 500;
        spriteRequireLoader.y = 700;

        app.ticker.add((delta) => gameLoop(delta));
      }

      function gameLoop(delta) {
        spriteHttpLoader.y -= 1;
      }
    }

    function spriteByNewImage() {
      const imageRequire = new Image();
      imageRequire.onload = setup;
      imageRequire.src = imageRequireAsset.uri;

      function setup(loader, resources) {
        new PIXI.Texture.fromLoader(imageRequire, imageRequire.src);
        spriteRequireLoader = new PIXI.Sprite(
          PIXI.utils.TextureCache[imageRequireAsset.uri],
        );
        app.stage.addChild(spriteRequireLoader);

        spriteRequireLoader.x = 500;
        spriteRequireLoader.y = 700;
      }
    }

    async function spriteByFrom() {
      spriteRequireLoader = PIXI.Sprite.from(imageRequireAsset.uri);
      app.stage.addChild(spriteRequireLoader);

      spriteRequireLoader.x = 500;
      spriteRequireLoader.y = 700;
    }
  };

  return (
    <GCanvasView
      style={{flex: 1, height: '100%'}}
      onCanvasCreate={onCanvasCreate}
      devicePixelRatio={devicePixelRatio}
    />
  );
};
