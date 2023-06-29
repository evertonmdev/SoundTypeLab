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

        if(e.response?.data) console.log(e.response?.data)
        else console.log(e)
        
        return false
    })

    if(!res) return false

     return "Bearer " + res.data?.accessToken;
}

const GetLyrics = async (Id, Bearer) => {
    const res = await axios({
        method: "GET",
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
        if(e.response?.data) console.log(e.response?.data)
        else console.log(e)

        return false
    })

    if(!res) return {
        error: true,
        message: 'Erro ao encontrar a letra da musica'
    }

    if(res.data?.lyrics?.syncType != 'LINE_SYNCED' ) {
        return {
            error: true,
            message: 'A letra disponivel no spotify não é sincronizada'
        }
    }

    return res.data?.lyrics?.lines
}



const GetIdTrackByName = async (name, bearer) => {
    try {
        const res = await axios({
            method: "GET",
            url: `https://api.spotify.com/v1/search?q=${name}&type=track&limit=7`,
            headers: {
                "authorization": bearer,
            }
        })

        if(!res.data?.tracks?.items[0]) return false

        const Musics = res.data.tracks.items.map(async (music) => {
            const Lyrics = await GetLyrics(music.id, bearer)
            if(Lyrics?.error) return null
            
            return {
                id: music.id,
                name: music.name,
                artist: music.artists[0].name,
                Title: `${music.name} - ${music.artists[0].name}`,
                Thumbnail: music.album.images[0].url,
                duration: music.duration_ms,
                Lyrics: Lyrics
            }
        })


        const MusicsResolved = await Promise.all(Musics)

        return {
            returned_musics: MusicsResolved.filter(e => e != null)
        }
    } catch (e) {
        if(e.response?.data) console.log(e.response?.data)
        else console.log(e)

        return false
    }
}




export default async function GetLyricsByName(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed, please use POST'})
    }

    const { name_find } = req.body

    if(!name_find) return res.status(400).json({error: 'Please send a name to find'})
    
    const Bearer = await CreateAuthorizationBearer()
    const Track = await GetIdTrackByName(name_find, Bearer)

    if(!Track) return res.status(400).json({error: 'Não encontrei essa musica :/'})

    const res_json = {
        arrayMusics: Track.returned_musics
    }

    return res.status(200).json(res_json)
}
