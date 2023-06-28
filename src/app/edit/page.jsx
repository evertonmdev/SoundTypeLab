"use client";

import Playback from "@/components/defaults/Playback";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { Header } from '@/components/defaults'

const Page = () => {
    const [music, setMusic] = useState({
        Title: null,
        Thumbnail: null,
        Lyrics: null
    })
    const [audio, setAudio] = useState(null)
    const audioRef = useRef(null)

    const [currentTime, setCurrentTime] = useState(0)

    const Send = async () => {
        const Link = await axios({
            method: "POST",
            url: `${window.location.origin}/api/GetYoutubeId`,
            data: {
                name: music.Title + ' original lyrics'
            }
        })
        setAudio(Link.data.link)
    }



    useEffect(() => {
        const MusicSelected = localStorage.getItem("MusicSelected")
        const MusicSelectedParsed = JSON.parse(MusicSelected)
        setMusic(MusicSelectedParsed)
        console.log(MusicSelectedParsed)
    }, [])


    useEffect(() => {
        if (music.Title) {
            Send()
        }
    }, [music])

    return (
        <main className="edit">
            <Header />
            <section className="track-and-thumb"> 
                <img src={music.Thumbnail} className="object-cover w-full h-full col-span-2 row-span-2 row-start-2" />
                <div>
                    {
                        audio ? <Playback Title={music.Title} src={audio} audioRef={audioRef} setCurrentTime={setCurrentTime} />
                            : 
                            <>
                                <h1 className="text-2xl font-mono text-white animate-pulse">LOADING...</h1>
                            </>
                    }
                </div>
            </section>
            <section className="lyrics">
                <h1 className="title">
                    {music.Title}
                </h1>
                <div>
                    {
                        music.Lyrics ? music.Lyrics.map((e, i) => {
                            const FraseAtual = parseInt(currentTime * 1000) > parseInt(e.startTimeMs) && parseInt(currentTime * 1000) < music.Lyrics[parseInt(i + 1)]?.startTimeMs


                            if (FraseAtual) {
                                return <span key={i} className="actual">
                                    {e.words}
                                </span>
                            } else {
                                return <p key={i}>
                                    {e.words}
                                </p>
                            }


                        }) : null
                    }
                </div>
            </section>
        </main>
    )
}

export default Page