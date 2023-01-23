<template>
    <div ref="paper" class="paper" />
    <el-button type="primary" @click="addDom('div')">增加块</el-button>
    <el-button type="primary" @click="addDom('input')">增加文字</el-button>
    <el-button type="primary" @click="handleDraw">生成图片</el-button>
</template>

<script setup lang="ts">
import { Ref } from 'nuxt/dist/app/compat/vue-demi';
const route = useRoute();
const {px, py} = toRaw(route.query)
console.warn('px',px, py);
type distance = string;
const initDraw = (x:distance,y:distance) => {
    ;
    moveDom(addDom('p'),x,y)
}

const paper: Ref<any> = ref(null);
const addDom = (dom: string) => {
    console.warn('dam', dom);
    const div = document.createElement(dom);
    div.id = Math.random().toString();
    div.classList.add('ele');
    (paper.value as HTMLDivElement).appendChild(div);
    return div;
    // watchDrag(div);
};
const moveDom = (dom:any,x:string,y:string) => {
    console.warn('dddd',dom);
    dom.style=`top:${y}px;left:${x}px;`
    console.warn('d',dom.style);
}
onMounted(()=>{
    initDraw(px as string,py as string);
})
const watchDrag = (drag: any): void => {
    if (!drag) return;
    let dragging = false,
        offsetLeft = 0,
        offsetTop = 0;
    drag.onmousedown = (e: any) => {
        // e.preventDefault();
        const { left, top } = drag.getBoundingClientRect(); // 获取悬浮按钮当前的top值和left值
        offsetLeft = e.clientX - left; // 点击的x轴坐标距悬浮按钮左边的距离

        offsetTop = e.clientY - top; // 点击的y轴坐标距悬浮按钮顶部的距离
        dragging = true; // 拖动状态
    };
    document.onmousemove = e => {
        // e.preventDefault();
        if (dragging) {
            // 只在拖动状态下处理
            // 获取悬浮按钮的节点信息
            const { left, top, width, height } = drag.getBoundingClientRect();
            // 可拖动的最大值，即悬浮按钮在右下角时的top值和left值
            const maxLeft = 375 - width,
                maxTop = 667 - height;
            // 设置left值
            if (left >= 0 && left <= maxLeft) drag.style.left = countPosition(e.clientX, offsetLeft, maxLeft) + 'px';

            // 设置top值
            if (top >= 0 && top <= maxTop) drag.style.top = countPosition(e.clientY, offsetTop, maxTop) + 'px';
        }
    };
    // 计算当前的left值或者top值，在0 - max之间
    function countPosition(clientSize: number, offsetSize: number, maxSize: number) {
        const value = clientSize - offsetSize;
        if (value < 0) {
            return 0;
        } else if (value >= 0 && value <= maxSize - 1) {
            return value;
        } else {
            return maxSize - 1;
        }
    }
    document.onmouseup = e => {
        e.preventDefault();
        dragging = false; // 取消拖动态
        const { left, width } = drag.getBoundingClientRect();
    };
};
const handleDraw = async () => {
    const a = await useFetch('/api/drawing')
};
</script>

<style>
.paper {
    overflow: hidden;
    width: 7.5rem;
    height: 13.34rem;
    border: 1px #b2b2b2 solid;
    position: relative;
}
.ele {
    width: 100px;
    height: 100px;
    position: absolute;
    border: 1px #b2b2b2 solid;
    background-color: red;
}
</style>
