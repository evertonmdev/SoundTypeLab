"use server";

import youtubeDl from 'ytdl-core';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Download = async (req, res) => {
    if(req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed, please use POST'})
    }

    const { 
        url,
        title,
        email
    } = req.body
 
    if(!email || !title || !url) return res.status(404).json({error: 'forbidado haha'})

    if(!email.includes('@gmail.com')) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
        if(!user) return res.status(404).json({error: 'forbidado haha'})
    
        await prisma.user.update({
            where: {
                email
            },
            data: {
                lastLinks: title
            }
        })
    } 

    const Title_Archive = title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, ' ').trim()

    res.setHeader('Content-Type', 'audio/*')
    res.setHeader('Content-Disposition', `attachment; filename=${Title_Archive}.mp3`)
    res.setHeader('Content-Type', 'application/octet-stream');


    const output = youtubeDl(url, {
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


export default Download;