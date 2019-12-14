const puppeteer = require('puppeteer');

export default async (url) => {
    const browser = await puppeteer.launch();
	const page = await browser.newPage();
		await page.setViewport({
            width: 1920,
            height: 3000
		});

    await page.goto(url);

    await page.evaluate(() => {
		// remove copy to clipboard button
		const copyButton = document.querySelector('.copy-btn');
        copyButton.remove();

        const card = document.querySelector('.snippet-card');
        card.style.borderRadius = '0px';

        const cardExample = document.querySelector('.card-example');
        cardExample.style.borderRadius = '0px';

        const cardTitle = document.querySelector('.snippet-card > .card-title');
        cardTitle.style.display = 'inline-block';

        const cardTagList = document.querySelector('.snippet-card > .tag-list');
        cardTagList.style.display = 'inline-block';

        [...document.querySelectorAll('.snippet-card > .tag-list > *')].forEach((tag, i, arr) => {
            if(i !== 0 && i!== 1 && i !== arr.length -1) tag.style.display = 'none';
        });
    });

     await page.screenshot({
        path: 'yoursite.png',
        omitBackground: true,
        fullPage: true
    });

    const element = await page.$('.card');
    await element.screenshot({path: `images/temp.png`})


  await browser.close();
}
