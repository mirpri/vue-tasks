module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false, // 禁止拆分代码
    },
  },
  chainWebpack: config => {
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
  }
};

