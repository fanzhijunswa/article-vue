module.exports = {
  devServer: {
    open: true
  },
  // vue想要修改原配置，那么需要加上这么一个属性
  chainWebpack: config => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  }
}
