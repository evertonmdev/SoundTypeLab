import axios from 'axios';
import fs  from 'fs';

const Handler = async (req, res) => {
    try {
        // console.log(req)
        const { url, title } = req.query;
        const Path = './youtube/' + title + '.mp3'

        const response = await axios({
            method: 'GET',
            url,
            responseType: 'stream',
            "headers": {
                "accept": "*/*",
                "accept-language": "pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                "range": "bytes=0-",
                "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "audio",
                "sec-fetch-mode": "no-cors",
                "sec-fetch-site": "same-origin",
                "referrer": url,
                "referrerPolicy": "strict-origin-when-cross-origin",
                "mode": "cors",
                "credentials": "omit" 
              },
        })       
        res.setHeader('Content-length', parseInt(response.headers['content-length'], 10))
        res.setHeader('Content-disposition', `attachment; filename=${title}.mp3`)
        res.setHeader('Content-type', 'audio/mp3')

        const writterFs = fs.createWriteStream(Path)

        response.data.pipe(writterFs)
    
        writterFs.on('finish', () => {
            console.log('Finished')
            fs.createReadStream(Path).pipe(res)
            // return res.status(200).json({message: 'Finished'})
        })
        
        // return res.status(200).json({message: 'Finished'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: 'Internal server error'})
    }
}


export default Handler;