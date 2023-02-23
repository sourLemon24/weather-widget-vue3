module.exports = {
  publicPath: '/weather-widget-vue3/',
  chainWebpack: config => {
    config.module
      .rule('vue')
        .use('vue-loader')
          .tap(options => {
            options.customElement = true
            return options
          })
    config.optimization
      .splitChunks(false)
    config.output
      .filename('app.js')
  }
}