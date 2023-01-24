<template>
    <div class="draw-page">
        <DrawTool :initData="options" />
        {{ options }}
    </div>
</template>

<script setup lang="ts">
import DrawTool from '../../components/DrawTool.vue';
import { decode } from '@/common/utils/index';
const route = useRoute();
const options = reactive(decode(route.params.options as string));
</script>

<style scoped>
.draw-page {
    height: 100vh;
    width: 100vw;
}
</style>
