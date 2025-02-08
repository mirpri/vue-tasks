const HtmlInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false, // 禁止拆分代码
    },
    plugins: [
      new HtmlInlineCSSWebpackPlugin(),
    ],
  },
  css: {
    extract: false, // 禁止分离 CSS
  },
  chainWebpack: config => {
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
  }
};

