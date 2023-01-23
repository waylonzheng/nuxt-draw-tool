import { defineNuxtPlugin } from '#app';
import 'element-plus/dist/index.full';
import ElementPlus from 'element-plus';
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(ElementPlus);
});
