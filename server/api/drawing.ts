import * as puppeteer from 'puppeteer';
export default defineEventHandler(async event => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3002/draw/121231231?px=123&py=112');
    await page.setViewport({ width: 375, height: 667 });
    const res = await page.screenshot({ 
        path: `./output/aa.webp`,
        type: 'webp',
        quality: 50, // 1~100 图片质量 png无效
        clip: {
            x: 0,
            y: 0,
            width:375,
            height:667
        }
    });
    await browser.close();
    return {
        res
    };
});
