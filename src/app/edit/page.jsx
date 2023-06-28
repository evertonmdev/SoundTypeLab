"use client";

import Playback from "@/components/defaults/Playback";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";


const Page = () => {
    const [ music, setMusic ] = useState({
        Title: null,
        Thumbnail: null,
        Lyrics: null
    })
    const [audio , setAudio] = useState({
        link: null,
        duration: null
    })
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
        setAudio(Link.data)
    }

  
    
    useEffect(() => {
        const MusicSelected = localStorage.getItem("MusicSelected")
        const MusicSelectedParsed = JSON.parse(MusicSelected)
        setMusic(MusicSelectedParsed)
        console.log(MusicSelectedParsed)
    }, [])


    useEffect(() => {
        if(music.Title) {
            Send()
        }
    }, [music])

    return (
        <main className={`w-screen h-screen overflow-hidden grid grid-cols-6 grid-rows-4 p-8 gap-4 relative`}>
            <motion.div
                animate={{
                    filter: ['blur(100px) brightness(0.5) hue-rotate(0deg)', 'blur(100px) brightness(0.5) hue-rotate(360deg)'],
                    transition: {
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'mirror'
                    }
                }}  
                style={{    
                    overflow: 'hidden',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${music.Thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backdropFilter: 'blur(100px)',
                    zIndex: '0',
                    scale: '1.2'
                }}
            />
            <img src={music.Thumbnail} className="object-cover w-full h-full col-span-2 row-span-2 row-start-2 z-10" />
            <div className="col-span-2 row-start-4 flex justify-center items-center gap-3 w-full h-full z-10" >
                { 
                    audio.link ? <Playback Title={music.Title} src={audio.link} duration={audio.duration} audioRef={audioRef} setCurrentTime={setCurrentTime} />
                    :<>
                       <h1 className="text-2xl font-mono text-white animate-pulse">LOADING...</h1>
                    </>
                }
            </div>
            <div className="col-span-4 row-span-2 row-start-2 z-10">
                <h1 className="text-4xl font-bold text-white ">
                    {music.Title}
                </h1>
                <div className="w-full h-full overflow-scroll overflow-x-hidden transition-all mt-2">
                    {
                        music.Lyrics ? music.Lyrics.map((e, i) => {
                            const FraseAtual = parseInt(currentTime * 1000) > parseInt(e.startTimeMs) && parseInt(currentTime * 1000) < music.Lyrics[parseInt(i + 1)]?.startTimeMs    


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

export default Page