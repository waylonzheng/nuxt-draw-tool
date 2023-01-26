<template>
    <!-- 画布 -->
    <div ref="paper" class="paper" />
    <p class="node-list">{{ nodeList }}</p>
    <el-button type="primary" @click="addDom('div')">增加块</el-button>
    <el-button type="primary" @click="addDom('input')">增加文字</el-button>
    <el-button type="primary" @click="handleDraw" :disabled="disabled">生成图片</el-button>
</template>

<script setup lang="ts">
import { Ref } from 'nuxt/dist/app/compat/vue-demi';
import { encode, decode } from '@/common/utils/index';
import { ElMessage } from 'element-plus';
// 画布dom
const paper: Ref<any> = ref(null);
// 节点结构
interface Node {
    id: string;
    type: domType;
    x: string | number;
    y: string | number;
    content?: string;
}
interface Props {
    initData?: Node[]; // 后端直接访问页面通过这个参数绘图
}
const props = withDefaults(defineProps<Props>(), {
    initData: () => [],
});
const emit = defineEmits(['finish']);
// 添加的所有dom
const nodeList: Node[] = reactive([]);
const disabled: Ref<Boolean> = ref(false);
type domType = 'div' | 'input';
// 添加dom 服务端绘图需要传客户端绘图的id
const addDom = (type: domType, id?: string, content?: string) => {
    const node: Node = {
        type: type,
        x: 0,
        y: 0,
        id: id ?? Math.round(Math.random() * 10000).toString(), // id为随机4位数
        content: '',
    };
    const ele = document.createElement(node.type);
    ele.id = node.id;
    ele.classList.add('ele');
    nodeList.push(node);
    (paper.value as HTMLDivElement).appendChild(ele);
    watchDrag(node.id);
    if (node.type === 'input') changeDomContent(node.id, content);
};
const moveDom = (id: string, x: string | number, y: string | number) => {
    const ele: HTMLElement = document.getElementById(id) as HTMLElement;
    ele.style.cssText = `${ele?.style.cssText}top:${y}px;left:${x}px`;
    nodeList.forEach(item => {
        if (item.id === id) {
            item.x = x;
            item.y = y;
        }
        return item;
    });
};
const changeDomContent = (id: string, content?: string) => {
    const input: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
    input.addEventListener('input', e => {
        nodeList.forEach(item => {
            if (item.id === id) {
                item.content = e?.srcElement?.value;
            }
            return item;
        });
    });
    content &&
        nodeList.forEach(item => {
            if (item.id === id) {
                input.value = content;
                item.content = content;
            }
            return item;
        });
};
// 通过父组件传来的值进行绘图
const initDraw = (list: Node[]) => {
    list.map(item => {
        addDom(item.type, item.id, item.content);
        moveDom(item.id, item.x, item.y);
    });
};
onMounted(() => {
    initDraw(toRaw(props.initData));
});
let dragging = false,
    offsetLeft = 0, // 点击位置距离dom左边距
    offsetTop = 0; // 点击位置距离dom上边距
const watchDrag = (id: string): void => {
    const ele: HTMLElement = document.getElementById(id) as HTMLElement;
    if (!ele) return;
    // 元素按下事件
    ele.onmousedown = (e: any) => {
        // e.preventDefault();
        const { left, top } = ele.getBoundingClientRect(); // 获取悬浮按钮当前的top值和left值
        offsetLeft = e.clientX - left; // 点击的x轴坐标距悬浮按钮左边的距离

        offsetTop = e.clientY - top; // 点击的y轴坐标距悬浮按钮顶部的距离
        dragging = true; // 拖动状态
    };
    // 元素移动事件
    document.onmousemove = e => {
        // e.preventDefault();
        if (dragging) {
            // 只在拖动状态下处理
            // 获取悬浮按钮的节点信息
            const { left, top, width, height } = ele.getBoundingClientRect();
            // 可拖动的最大值，即悬浮按钮在右下角时的top值和left值
            const maxLeft = 375 - width,
                maxTop = 667 - height;
            // 设置left值
            if (left >= 0 && left <= maxLeft) {
                ele.style.left = countPosition(e.clientX, offsetLeft, maxLeft) + 'px';
                nodeList.forEach(item => {
                    if (item.id === id) {
                        item.x = countPosition(e.clientX, offsetLeft, maxLeft);
                    }
                    return item;
                });
            }

            // 设置top值
            if (top >= 0 && top <= maxTop) {
                ele.style.top = countPosition(e.clientY, offsetTop, maxTop) + 'px';
                nodeList.forEach(item => {
                    if (item.id === id) {
                        item.y = countPosition(e.clientY, offsetTop, maxTop);
                    }
                    return item;
                });
            }
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
    // 松开鼠标
    document.onmouseup = e => {
        e.preventDefault();
        dragging = false; // 取消拖动态
    };
};
const handleDraw = async () => {
    disabled.value = true;
    const base64 = encode(toRaw(nodeList));
    console.warn('base64', base64);
    const { data, error } = await useFetch('/api/drawing', {
        params: {
            options: base64,
        },
    });
    if (error.value) return;
    emit('finish', data.value?.output);
    disabled.value = false;
    ElMessage({
        message: '生成成功！',
        type: 'success',
    });
};
</script>

<style lang="scss">
.node-list {
    font-size: 16px;
    display: block;
    width: 375px;
}
.paper {
    overflow: hidden;
    width: 7.5rem;
    height: 13.34rem;
    border: 1px #b2b2b2 solid;
    position: relative;
    background-color: #ffffff;
    color: #000000;
    > input {
        text-align: center;
    }
    .ele {
        width: 100px;
        height: 100px;
        position: absolute;
        border: 1px #b2b2b2 solid;
        background-color: red;
    }
}
</style>
