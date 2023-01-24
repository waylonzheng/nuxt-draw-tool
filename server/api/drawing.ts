import { H3Event } from 'h3';
import * as puppeteer from 'puppeteer';
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('foo');
    }, 3000);
});
export default defineEventHandler(async event => {
    const query = event!.node!.req!.url!.split('options=')[1];
    console.warn('query', query);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:3002/draw/${query}`, {
        waitUntil: 'networkidle0',
    });
    await page.content();
    const res = await page.screenshot({
        path: `./output/${new Date().getTime()}.webp`,
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
    return {
        res,
    };
});
