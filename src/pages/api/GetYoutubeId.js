"use server"; 
import puppeteer from "puppeteer";

const GetYoutubeId = async (req, res) => {
    if(req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed, please use POST'})
    }

    const { name } = req.body

    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ]
        });

        req.once('close', async () => {
           await browser.close();
        })

        const page = await browser.newPage();
        await page.goto(`https://www.youtube.com/results?search_query=${name}`);
        await page.waitForSelector('#contents > ytd-video-renderer[lockup="true"]');
        const link = await page.evaluate(() => {
            return document.querySelector('#contents > ytd-video-renderer > div > div > div > div > h3 > a').href
        }
        );
        await browser.close();
        
        return res.status(200).json({
            link: link,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Internal Server Error'})
    }

}


export default GetYoutubeId;