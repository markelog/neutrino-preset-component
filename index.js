const { join, basename } = require('path');

const styleLoader = require('neutrino-middleware-style-loader');
const fontLoader = require('neutrino-middleware-font-loader');
const imageLoader = require('neutrino-middleware-image-loader');
const compileLoader = require('neutrino-middleware-compile-loader');
const copy = require('neutrino-middleware-copy');
const clean = require('neutrino-middleware-clean');

const MODULES = join(__dirname, 'node_modules');
const preset = require.resolve('babel-preset-env');
const dynamicImport = require.resolve('babel-plugin-syntax-dynamic-import');

module.exports = (neutrino, opts = {}) => {
  const babel = compileLoader.merge({
    plugins: [
      dynamicImport
    ],
    presets: [
      [preset, {
        debug: neutrino.options.debug,
        useBuiltIns: true,
        targets: {
          browsers: []
        }
      }]
    ]
  }, opts.babel || {});

  const presetEnvOptions = babel.presets[0][1];

  if (!presetEnvOptions.targets.browsers.length) {
    presetEnvOptions.targets.browsers.push(
      'last 2 Chrome versions',
      'last 2 Firefox versions',
      'last 2 Edge versions',
      'last 2 Opera versions',
      'last 2 Safari versions',
      'last 2 iOS versions'
    );
  }

  neutrino.use(styleLoader);
  neutrino.use(fontLoader);
  neutrino.use(imageLoader);
  neutrino.use(compileLoader, {
    include: [
      neutrino.options.source,
      neutrino.options.tests
    ],
    exclude: [neutrino.options.static],
    babel
  });

  neutrino.config
    .entry('index')
      .add(neutrino.options.entry)
      .end()
    .output
      .path(neutrino.options.output)
      .publicPath('./')
      .libraryTarget('commonjs2')
      .filename('[name].js')
      .end()
    .resolve
      .modules
        .add('node_modules')
        .add(neutrino.options.node_modules)
        .add(MODULES)
        .end()
      .extensions
        .add('.js')
        .add('.json')
        .end()
      .end()
    .resolveLoader
      .modules
        .add(neutrino.options.node_modules)
        .add(MODULES)
        .end()
      .end();

  neutrino.use(clean, { paths: [neutrino.options.output] });
  neutrino.use(copy, {
    patterns: [{
      context: neutrino.options.static,
      from: '**/*',
      to: basename(neutrino.options.static)
    }]
  });
};
