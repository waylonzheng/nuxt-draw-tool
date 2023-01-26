<template>
    <div class="draw-page">
        <div class="draw-page-left">
            <DrawTool @finish="finish" />
        </div>
        <div class="draw-page-right">
            <div>
                <img :src="url" alt="👈先操作左边" />
            </div>
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
    align-items: flex-start;
    > div {
        width: 100%;
    }
    &-right {
        > div {
            height: 667px;
            width: 375px;
            background-color: white;
            color: black;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
