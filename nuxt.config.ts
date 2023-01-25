export default defineNuxtConfig({
    app: {
        baseURL: '/nuxt/',
        // buildAssetsDir: ':3000/nuxt/',
        // cdnURL: 'http://43.136.79.140/nuxt/',
    },
    // css
    css: ['~/assets/style/index.scss'],
    // build
    // build: {
    //     transpile: ['element-plus'],
    // },

    typescript: {
        strict: true,
        shim: false,
    },

    // build modules
    // modules: ['@element-plus/nuxt'],

    // elementPlus: {
    //     icon: 'ElIcon',
    // },
});
