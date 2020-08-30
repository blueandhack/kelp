const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // TODO: change theme color variables
            modifyVars: {
              '@primary-color': '#5edfff',
              '@brand-primary': '#5edfff',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
