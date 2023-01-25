import * as puppeteer from 'puppeteer';
import { copyFile, cp } from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __filenameNew = fileURLToPath(import.meta.url);

const __dirnameNew = path.dirname(__filenameNew);

export default defineEventHandler(async event => {
    const query = event!.node!.req!.url!.split('options=')[1];
    const fileName = `${new Date().getTime()}.webp`;
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(`http://localhost:3002/draw/${query}`, {
        waitUntil: 'networkidle0',
    });
    await page.content();
    const res = await page.screenshot({
        path: `./output/${fileName}`,
        type: 'webp',
        quality: 100, // 1~100 图片质量 png无效
        // fullPage: true,
        clip: {
            x: 0,
            y: 0,
            width: 375,
            height: 667,
        },
    });
    await browser.close();
    console.log(path.resolve(__dirnameNew));
    const DEV = 0;
    const to = `${DEV ? '/code/vue/mine/static/' : '/usr/local/nginx/static/usr/'}${fileName}`;
    const from = `${
        DEV ? '/code/vue/mine/nuxt-draw/output/' : '/usr/local/nginx/data/nuxt-draw-tool/output/'
    }${fileName}`;
    cp(from, to, res => {
        console.warn('123123', res);
    });
    return {
        res,
    };
});
