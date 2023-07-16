"use server";

import youtubeDl from "ytdl-core";

export default async (req, res) => {
    if(req.method !== 'GET') {
        return res.status(405).json({error: 'Method not allowed, please use GET'})
    }
  
    if(!req.query.link || req.query.link == '' || req.query.link == null || !req.query.title  || req.query.title == '' || req.query.title == null) {
        return res.status(400).json({error: 'Bad Request'})
    }

    var parsedLink = decodeURIComponent(req.query.link)

    res.setHeader('Content-Type', 'audio/*')
    res.setHeader('Transfer-Encoding', 'chunked')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Expires', '0')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    res.setHeader('Referrer-Policy', 'no-referrer')
    res.setHeader('Feature-Policy', 'microphone "none"; camera "none"') 

    const output = youtubeDl(parsedLink, {
        filter: "audioonly",
        quality: "highestaudio",
        
    })

    
    req.once('close', async () => {
        output.destroy();
    })

    output.on('finish', () => {
        res.end()
    })
 
    output.pipe(res)
}


export const config = {
    api: {
        responseLimit: '10mb',
    }
}