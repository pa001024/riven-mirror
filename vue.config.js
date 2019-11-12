const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  chainWebpack: config => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .loader("ts-loader")
      .tap(options => {
        options.transpileOnly = true;
        return options;
      });
    config.module
      .rule("worker")
      .test(/\.worker\.js$/)
      .use("worker-loader")
      .loader("worker-loader")
      .options({
        exclude: /(node_modules)/,
      });
    config.module
      .rule("data")
      .test(/\.data$/)
      .use("file-loader")
      .loader("file-loader")
      .options({ name: "[hash].[ext]" });
    config.module
      .rule("proto")
      .test(/\.proto$/)
      .use("protobuf-preloader")
      .loader("protobuf-preloader")
      .options({
        /* controls the "target" flag to pbjs - true for
         * json-module, false for static-module.
         * default: false
         */
        json: false,

        /* import paths provided to pbjs.
         * default: webpack import paths (i.e. config.resolve.modules)
         */
        paths: ["@/proto"],

        /* additional command line arguments passed to
         * pbjs, see https://github.com/dcodeIO/ProtoBuf.js/#pbjs-for-javascript
         * for a list of what's available.
         * default: []
         */
        pbjsArgs: ["--no-encode"],
      });
  },
  configureWebpack: {
    devtool: "inline-source-map",
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.cn.html",
        template: "public/index.cn.html",
        inject: true,
        minify: true,
      }),
    ],
  },
  productionSourceMap: false,
  pwa: {
    name: "Riven Mirror",
    themeColor: "#3d5afe",
    msTileColor: "#000000",
    appleMobileWebAppCapable: true,
    appleMobileWebAppStatusBarStyle: "black",
    manifestPath: "manifest.json",
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "img/icons/apple-icon-152x152.png",
      msTileImage: "img/icons/icon-144x144.png",
    },
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      importWorkboxFrom: "disabled",
      importScripts: ["workbox-v3.6.3/workbox-sw.js"],
      importsDirectory: "wb",
      precacheManifestFilename: "cache.[manifestHash].js",
      swSrc: "./sw.js",
      swDest: "./sw.js",
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: "im.riven.desktop",
        win: {
          icon: "app.ico",
        },
      },
    },
  },
};
