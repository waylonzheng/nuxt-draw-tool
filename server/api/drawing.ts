import * as puppeteer from 'puppeteer';
export default defineEventHandler(event => {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://www.baidu.com');
        // await page.setViewport({ width: 50, height: 50 });
        await page.screenshot({ path: `./output/aa.png` });
        await browser.close();
    })();
    return {
        api: 'works',
    };
});
