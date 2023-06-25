"use server";

import axios from "axios";
import youtubeDl from "youtube-dl-exec";
import Ffmpeg from "fluent-ffmpeg";

export default async (req, res) => {
    if(req.method !== 'GET') {
        return res.status(405).json({error: 'Method not allowed, please use GET'})
    }
  
    if(!req.query.link || req.query.link == '' || req.query.link == null || !req.query.title  || req.query.title == '' || req.query.title == null) {
        return res.status(400).json({error: 'Bad Request'})
    }

    const parsedLink = decodeURIComponent(req.query.link)

    const output = await youtubeDl(parsedLink, {
        dumpSingleJson: true,
        socketTimeout: 5000,
    })
    
    const Formats = output.formats.map(e => {
        if(e.format_note && e.resolution == 'audio only' && e.format != "Default" ) {
            return {
                format: e.format_note,
                url: e.url,
            }
        }
        return null
    }).filter(e => e != null)

    const StreamPipeUrl = await axios({
        method: 'GET',
        url: Formats[4].url,
        responseType: 'stream',
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "cache-control": "max-age=0",
            "if-modified-since": "Wed, 22 Mar 2023 19:23:56 GMT",
            "range": "bytes=0-3827735",
            "upgrade-insecure-requests": "1"
        },
    })

    const Title_Archive = decodeURIComponent(req.query.title).replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, ' ').trim()

    res.setHeader('Content-Type', 'audio/*')
    res.setHeader('Content-Disposition', `attachment; filename=${Title_Archive}.mp3`)
    res.setHeader('Transfer-Encoding', 'chunked')
    res.setHeader('Accept-Ranges', 'bytes')
    res.setHeader('Content-Range', 'bytes 0-3827735/3827736')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('Referrer-Policy', 'no-referrer')
    res.setHeader('Content-Encoding', 'gzip')

    Ffmpeg(StreamPipeUrl.data)
        .audioBitrate(128)
        .format('mp3')
        .on('error', function(err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', function() {
            console.log('Processing finished !');
        })
        .pipe(res)
}


export const config = {
    api: {
        responseLimit: '10mb',
    }
}