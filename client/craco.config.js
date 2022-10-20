const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // '@primary-color': '#1DA57A' /
              '@font-family': 'Poppins'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // eslint-disable-next-line no-param-reassign
      webpackConfig.resolve.fallback = {
        "crypto": false,
        // "buffer": false,
        // "assert": false,
        // "buffer": false,
        // "console": false,
        // "constants": false,
        // "domain": false,
        // "events": false,
        // "http": false,
        // "https": false,
        // "os": false,
        // "path": false,
        // "punycode": false,
        // "process": false,
        // "querystring": false,
        // "stream": false,
        // "string_decoder": false,
        // "sys": false,
        // "timers": false,
        // "tty": false,
        // "url": false,
        // "util": false,
        // "vm": false,
        // "zlib": false,
      };
      return webpackConfig;
    },
  },
};