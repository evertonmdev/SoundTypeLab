"use server";

import youtubeDl from "ytdl-core";
// import Ffmpeg from "fluent-ffmpeg";

export default async (req, res) => {
    if(req.method !== 'GET') {
        return res.status(405).json({error: 'Method not allowed, please use GET'})
    }
  
    if(!req.query.link || req.query.link == '' || req.query.link == null || !req.query.title  || req.query.title == '' || req.query.title == null) {
        return res.status(400).json({error: 'Bad Request'})
    }

    var parsedLink = decodeURIComponent(req.query.link)

    const Title_Archive = decodeURIComponent(req.query.title).replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, ' ').trim()

    res.setHeader('Content-Type', 'audio/*')
    res.setHeader('Content-Disposition', `attachment; filename=${Title_Archive}.mp3`)
    res.setHeader('Transfer-Encoding', 'chunked')
    res.setHeader('Accept-Ranges', 'bytes')
    res.setHeader('Content-Range', 'bytes 0-3827735/3827736')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Expires', '0')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    res.setHeader('X-Frame-Options', 'DENY')

    const output = youtubeDl(parsedLink, {
        filter: "audioonly",
        quality: "highestaudio",
    }).pipe(res)


    // Ffmpeg(output)
    //     .audioBitrate(128)
    //     .format('mp3')
    //     .on('error', function(err) {
    //         console.log('An error occurred: ' + err.message);
    //     })
    //     .on('end', function() {
    //         console.log('Processing finished !');
    //     })
    //     .pipe()
}


export const config = {
    api: {
        responseLimit: '10mb',
    }
}