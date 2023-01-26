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
    <footer>
        <p>
            源码：
            <a href="https://gitee.com/waylonzheng/nuxt-draw-tool">https://gitee.com/waylonzheng/nuxt-draw-tool</a>
        </p>
        <p>
            作者：
            <a href="https://gitee.com/waylonzheng">waylonzheng</a>
        </p>
        <p>实验性demo,旨在使用nuxt3 的 server routes + puppeteer 实现node.js服务端画图</p>
        <p>由于服务器内存有限 图片质量较低 实际开发中是可调节图片高质量输出的</p>
    </footer>
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
footer {
    position: fixed;
    color: #ffffff;
    bottom: 0;
    font-size: 16px;
    padding: 20px;
    a {
        color: blue;
    }
}
</style>
