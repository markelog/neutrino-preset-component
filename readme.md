# Neutrino Library Preset [![Build Status](https://travis-ci.org/markelog/neutrino-preset-library.svg?branch=master)](https://travis-ci.org/markelog/neutrino-preset-library)

> Neutrino preset for building library, components and such

## Features

Similar to the [neutrino-preset-web](https://github.com/mozilla-neutrino/neutrino-dev/tree/master/packages/neutrino-preset-web) not for the apps though, but for the libraries, components and such.

Nope, not for the react components... yet :)

- Zero upfront configuration necessary to start developing and building a library
- Modern Babel compilation supporting ES modules, last 2 major browser versions, async functions, and dynamic imports
- Webpack loaders for importing CSS, images, icons, fonts
- Tree-shaking to create smaller bundles
- Production-optimized bundles with Babili minification

## Install

```bash
$ npm install --save-dev neutrino neutrino-preset-library
```

## Development

For the development it's recommended to use [`neutrino-preset-web`](https://github.com/mozilla-neutrino/neutrino-dev/tree/master/packages/neutrino-preset-web). See example of using `neutrino-preset-web` for development and `neutrino-preset-library` for build in in [this](https://github.com/wearereasonablepeople/d3-timeline-scroll) project. See `package.json` and `.neutrinorc` files.

## Project Layout

`neutrino-preset-library` follows the standard [project layout](https://neutrino.js.org/project-layout) specified by Neutrino. This means that by default all project source code should live in a directory named `src` in the root of the project. This includes JavaScript files, CSS stylesheets, images, and any other assets that would be available
to your compiled project.

Edit your project's package.json to add commands for starting and building the application:

```json
{
  "scripts": {
    "build": "neutrino build --use neutrino-preset-library"
  }
}
```

If you are using `.neutrinorc.js`, add this preset to your use array instead of `--use` flags:

```js
module.exports = {
  use: ['neutrino-preset-library']
};
```

## Building

`neutrino-preset-preset` builds static assets to the `build` directory by default when running `neutrino build`. Using the quick start example above as a reference:

```bash
$ npm run build

✔ Building project completed
Hash: 301112cfe9a1006a2aaa
Version: webpack 2.7.0
Time: 725ms
   Asset     Size  Chunks             Chunk Names
index.js  26.3 kB       0  [emitted]  index
```

## Static assets

If you wish to copy files to the build directory that are not imported from application code, you can place them in a directory within `src` called `static`. All files in this directory will be copied from `src/static`
to `build/static`.

## Preset options

You can provide custom options and have them merged with this preset's default options to easily affect how this preset builds. You can modify Web preset settings from `.neutrinorc.js` by overriding with an options object. Use an array pair instead of a string to supply these options in `.neutrinorc.js`.

The following shows how you can pass an options object to the Web preset and override its options, showing the defaults:

```js
module.exports = {
  use: [
    ['neutrino-preset-library', {
      // Add additional Babel plugins, presets, or env options
      babel: {
        // Override options for babel-preset-env
        presets: [
          ['babel-preset-env', {
            // Passing in targets to babel-preset-env will replace them
            // instead of merging them
            targets: {
              browsers: [
                'last 1 Chrome versions',
                'last 1 Firefox versions'
              ]
            }
          }]
        ]
      }
    }]
  ]
};
```

## Customizing

To override the build configuration, start with the documentation on [customization](https://neutrino.js.org/customization). `neutrino-preset-library` creates some conventions to make overriding the configuration easier once you are ready to make changes

### Rules

The following is a list of rules and their identifiers which can be overridden:

| Name | Description | Environments |
| ---- | ----------- | ------------ |
| `compile` | Compiles JS files from the `src` directory using Babel. Contains a single loader named `babel`. From `neutrino-middleware-compile-loader`. | all |
| `style` | Allows importing CSS stylesheets from modules. Contains two loaders named `style` and `css`. From `neutrino-middleware-style-loader`. | all |
| `img`, `svg`, `ico` | Allows import image files from modules. Each contains a single loader named `url`. From `neutrino-middleware-image-loader`. | all |
| `woff`, `ttf` | Allows importing WOFF and TTF font files from modules. Each contains a single loader named `url`. From `neutrino-middleware-font-loader`. | all |
| `eot` | Allows importing EOT font files from modules. Contains a single loader named `file`. From `neutrino-middleware-font-loader`. | all |

### Override configuration

By following the [customization guide](https://neutrino.js.org/customization) and knowing the rule, loader, and plugin IDs above, you can override and augment the build by by providing a function to your `.neutrinorc.js` use array. You can also make these changes from the Neutrino API in custom middleware.
