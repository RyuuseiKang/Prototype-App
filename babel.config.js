module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'babel-plugin-styled-components',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          api: './src/api',
          components: './src/components',
          hooks: './src/hooks',
          pages: './src/pages',
          stores: './src/stores',
          assets: './src/assets',
          styles: './src/styles',
          utils: './src/utils',
        },
      },
    ],
  ],
};
