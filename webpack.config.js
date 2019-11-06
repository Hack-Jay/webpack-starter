module.exports = (env, argv) => {
  return argv.mode === 'production' ? 
    require('./build/webpack.pro.js') :
    require('./build/webpack.dev.js')
}