import * as puppeteer from 'puppeteer';
import { copyFile, cp, unlink } from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
const DEV = 1;

const __filenameNew = fileURLToPath(import.meta.url);

const __dirnameNew = path.dirname(__filenameNew);
export default defineEventHandler(async event => {
    const query = event!.node!.req!.url!.split('options=')[1];
    const fileName = `${new Date().getTime()}.webp`;
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    const renderPage = DEV ? `http://localhost:3002/nuxt/draw/${query}` : `http://43.136.79.140/nuxt/draw/${query}`; // 渲染的页面
    await page.goto(renderPage, {
        waitUntil: 'networkidle0',
    });
    await page.content();
    const output = `${DEV ? '/code/vue/mine/static/' : '/usr/local/nginx/static/usr/draw/'}${fileName}`;
    const res = await page.screenshot({
        path: output,
        type: 'webp',
        quality: 50, // 1~100 图片质量 png无效
        // fullPage: true,
        clip: {
            x: 0,
            y: 0,
            width: 375,
            height: 667,
        },
    });
    await browser.close();
    // 将图片copy到图片服务器
    // cp(from, to, err => {
    //     if (err) throw err;
    //     unlink(from, err => {
    //         if (err) throw err;
    //         console.log('文件已删除');
    //     });
    // });
    return {
        output: `/static/usr/draw/${fileName}`,
    };
});
