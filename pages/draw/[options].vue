<template>
    <div class="draw-page">
        <DrawTool :initData="options" @finish="finish" />
    </div>
</template>

<script setup lang="ts">
import DrawTool from '../../components/DrawTool.vue';
import { decode } from '@/common/utils/index';
const route = useRoute();
const options = reactive(decode(route.params.options as string));
const url = ref('');
const finish = (value: string) => {
    url.value = value;
};
</script>

<style lang="scss" scoped>
.draw-page {
    height: 100vh;
    width: 100vw;
}
</style>
