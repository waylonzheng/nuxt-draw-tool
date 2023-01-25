<template>
    <div class="draw-page">
        <div class="draw-page-left">
            <DrawTool @finish="finish" />
        </div>
        <div class="draw-page-right">
            <img :src="url" alt="👈先操作左边" />
        </div>
    </div>
</template>

<script setup lang="ts">
import DrawTool from '../../components/DrawTool.vue';
const url = ref('');
const finish = (value: string) => {
    url.value = value;
};
</script>

<style lang="scss" scoped>
.draw-page {
    height: 100vh;
    width: 100vw;
    display: flex;
    > div {
        widows: 100%;
    }
    &-right {
        img {
            width: 375px;
            height: 667px;
        }
    }
}
</style>
