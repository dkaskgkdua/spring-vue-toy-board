module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8081'
      }
    }
  },
  configureWebpack: {
    entry: {
      app: './src/main.js',
      style: [
          'bootstrap/dist/css/bootstrap.min.css'
      ]
    }
  }
}
