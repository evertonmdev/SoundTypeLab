"use client";

import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { Header, Playback } from '@/components/defaults';

const Page = () => {
    const fraseAtual = useRef(null)
    const [music, setMusic] = useState({
        Title: null,
        Thumbnail: null,
        duration: null,
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
                name: music.Title
            }
        })
        setAudio(Link.data.link)
    }



    useEffect(() => {
        const MusicSelected = localStorage.getItem("MusicSelected")
        const MusicSelectedParsed = JSON.parse(MusicSelected)
        setMusic(MusicSelectedParsed)
    }, [])

    useEffect(() => {
        if (fraseAtual.current) {
            fraseAtual.current.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, [fraseAtual.current])

    useEffect(() => {
        if (music.Title) Send()
    }, [music])

    return (
        <main className="edit">
            <Header />
            <div className="edit-container">
                <section className="thumb-track">
                    <img src={music.Thumbnail} />
                    <div className="track">
                        {
                            audio ? <Playback Title={music.Title} duration={music.duration} src={audio} audioRef={audioRef} setCurrentTime={setCurrentTime} />
                                :
                                <>
                                    <h1 className="text-2xl font-mono text-white animate-pulse">Carregando...</h1>
                                </>
                        }
                    </div>
                </section>
                <section className="lyrics">
                    <h1>
                        {music.Title}
                    </h1>
                    <div>
                        {
                            music.Lyrics ? music.Lyrics.map((e, i) => {
                                const FraseAtual = parseInt(currentTime * 1000) > parseInt(e.startTimeMs) && parseInt(currentTime * 1000) < music.Lyrics[parseInt(i + 1)]?.startTimeMs


                                if (FraseAtual) {
                                    return <p key={i} ref={fraseAtual} className="actual">
                                        {e.words}
                                    </p>
                                } else {
                                    return <p key={i}>
                                        {e.words}
                                    </p>
                                }


                            }) : null
                        }
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Page