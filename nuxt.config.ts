export default defineNuxtConfig({
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