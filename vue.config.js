module.exports = {
  configureWebpack: {
    devtool: false,
  },
  pwa: {
    name: 'Riven Mirror',
    themeColor: '#3d5afe',
    msTileColor: '#000000',
    appleMobileWebAppCapable: true,
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'img/icons/favicon.ico',
      favicon16: 'img/icons/favicon.ico',
      appleTouchIcon: 'img/icons/apple-icon-152x152.png',
      msTileImage: 'img/icons/icon-144x144.png'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      importWorkboxFrom: 'local',
      importsDirectory: 'wb',
      precacheManifestFilename: 'cache.[manifestHash].js',
      swSrc: './sw.js',
      swDest: './sw.js',
      globDirectory: './dist/',
    },
  },
}
