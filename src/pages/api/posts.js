"use server";

import axios from "axios";

const CreateAuthorizationBearer = async () => {
    const res = await axios({
        url: "https://open.spotify.com/get_access_token?reason=transport&productType=web_player",
        method: "GET",
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36',
            'App-platform': 'WebPlayer',
            'content-type': 'text/html; charset=utf-8',
            'Cookie':`sp_dc=${process.env.TEMPORARY_SPOTIFY_TOKEN};`
        }
    }).catch(e => {
        console.log('Erro no CreateAuthorizationBearer ======//====== ')
        console.log(e.response.data)

        return false
    })

    if(!res) return false

     return "Bearer " + res.data?.accessToken;
}


const GetIdTrackByName = async (name, bearer) => {
    try {
        const res = await axios({
            method: "GET",
            url: `https://api.spotify.com/v1/search?q=${name}&type=track&limit=1`,
            headers: {
                "authorization": bearer,
            }
        })

        console.log(res.data.tracks.items[0].id)

        return {
            id: res.data.tracks.items[0].id,
            name: res.data.tracks.items[0].name,
            artist: res.data.tracks.items[0].artists[0].name,
            image: res.data.tracks.items[0].album.images[0].url,
        }
    } catch (e) {
        console.log('Erro no GetIdTrackByName ======//====== ')
        console.log(e.response.data)

        return false
    }
}

const GetLyrics = async (Id, Bearer) => {
    const res = await axios({
        method: "get",
        url: `https://spclient.wg.spotify.com/color-lyrics/v2/track/${Id}?format=json&vocalRemoval=false&market=from_token`,
        headers: {
            "accept": "application/json",
            "accept-language": "pt-BR",
            "app-platform": "WebPlayer",
            "authorization": Bearer,
            "spotify-app-version": "1.2.15.459.g581036fd",
            "referrer": "https://open.spotify.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "mode": "cors",
            "credentials": "include"
        }
    }).catch(e => {
        console.log('Erro no GetLyrics ======//====== ')
        console.log(e.response.data)

        return false
    })

    if(!res)  return {
        error: true,
        message: "Err to get lyrics"
    }

    if(res.data?.lyrics?.syncType != 'LINE_SYNCED' ) {
        return {
            error: true,
            message: "Lyrics not compatible"
        }
    }

    return res.data?.lyrics?.lines
}




export default async function GetLyricsByName(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed, please use POST'})
    }

    const { name_find } = req.body
    
    const Bearer = await CreateAuthorizationBearer()
    const Track = await GetIdTrackByName(name_find, Bearer)

    if(!Track) return {
        error: true,
        message: "Track not found"
    }

    const Lyrics = await GetLyrics(Track.id, Bearer)

    if(Lyrics?.error) return res.status(400).json(Lyrics.message)

    const res_json = {
        title: `${Track.name} - ${Track.artist}`,
        thumbnail: Track.image,
        lyrics: Lyrics
    }

    
    console.log(res_json)
    return res.status(200).json(res_json)
}
