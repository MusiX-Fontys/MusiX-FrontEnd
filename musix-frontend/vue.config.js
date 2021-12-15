const releaseType = process.env.VUE_APP_RELEASE_TYPE

module.exports = {
     publicPath: releaseType === 'production' ? '/MusiX-FrontEnd/' : '/'
}