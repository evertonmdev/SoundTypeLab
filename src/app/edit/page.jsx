"use client";

import Playback from "@/components/defaults/Playback";
import axios from "axios";
import { useEffect, useState, useRef } from "react";


const page = () => {
    const [ Music, setMusic ] = useState({
        Title: null,
        Thumbnail: null,
        Lyrics: null
    })
    const [Audio , setAudio] = useState(null)
    const AudioRef = useRef(null)

    const [CurrentTime, setCurrentTime] = useState(0)

    const Send = async () => {
        const Link = await axios({
            method: "POST",
            url: "http://localhost:3000/api/GetYoutubeId",
            data: {
                name: Music.Title + " lyrics"
            }
        })

        
        const response = await axios({
            method: "POST",
            url: "http://localhost:3000/api/playback",
            data: {
                link: Link.data.link
            }
        })

        setAudio(response.data.formats[5].url)
    }

  
    
    useEffect(() => {
        const MusicSelected = localStorage.getItem("MusicSelected")
        const MusicSelectedParsed = JSON.parse(MusicSelected)
        setMusic(MusicSelectedParsed)
        console.log(MusicSelectedParsed)
    }, [])


    useEffect(() => {
        if(Music.Title) {
            Send()
        }
    }, [Music])

    return (
        <main className="w-screen h-screen grid grid-cols-6 grid-rows-4 p-8 gap-4">
            <img src={Music.Thumbnail} className="object-cover w-full h-full col-span-2 row-span-2 row-start-2" />
            <div className="col-span-2 row-start-4 flex justify-center items-center gap-3 w-full h-full " >
                { 
                    Audio ? <Playback src={Audio} audioRef={AudioRef} setCurrentTime={setCurrentTime} />
                    :<>
                       <h1 className="text-2xl font-mono text-white animate-pulse">LOADING...</h1>
                    </>
                }
            </div>
            <div className="col-span-4 row-span-2 row-start-2">
                <h1 className="text-4xl font-bold text-white ">
                    {Music.Title}
                </h1>
                <div className="w-full h-full overflow-scroll overflow-x-hidden transition-all mt-2">
                    {
                        Music.Lyrics ? Music.Lyrics.map((e, i) => {
                            const FraseAtual = parseInt(CurrentTime * 1000) > parseInt(e.startTimeMs) && parseInt(CurrentTime * 1000) < Music.Lyrics[parseInt(i + 1)]?.startTimeMs    


                            if(FraseAtual) {
                                return <p key={i} className="text-green-800 font-bold text-xl transition-all">
                                    {e.words}
                                </p>
                            } else {
                                return <p key={i} className="text-white text-sm transition-all">
                                    {e.words}
                                </p>
                            }

                    
                        }) : null
                    }
                </div>
            </div>
        </main>
    )
}

export default page