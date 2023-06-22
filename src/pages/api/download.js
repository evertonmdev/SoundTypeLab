import {pipeline} from 'stream';
import axios from 'axios';

import { promisify } from 'util';

const Handler = async (req, res) => {
    try {
        // console.log(req)
        const { url, title } = req.query;
        const response = await axios.get(url, {
            responseType: 'stream'
        })

        console.log(title)

        res.setHeader('Content-length', response.headers['content-length'].toString())
        res.setHeader('Content-disposition', `attachment; filename=${title}.mp3`)
        res.setHeader('Content-type', 'audio/mpeg')

        console.log(response.headers['content-length'])

        await promisify(pipeline)(response.data, res)
        res.status(200).json({ message: 'Download concluído' });
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: 'Internal server error'})
    }
}


export default Handler;