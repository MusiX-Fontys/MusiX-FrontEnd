const releaseType = process.env.VUE_APP_RELEASE_TYPE

export const publicPath = releaseType === 'production' ? '/MusiX-FrontEnd/' : '/'