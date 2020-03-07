const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  (config) => {
    return config;
  },
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#5edfff', '@brand-primary': '#5edfff' },
  })
);
