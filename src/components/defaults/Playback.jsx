"use client";

import {  Download, PauseIcon, PlayIcon } from "lucide-react"
import { BsCircleFill, BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs'
import { useEffect, useState } from "react"

import { useSession } from "next-auth/react";

import { useAudioPlayer } from "react-use-audio-player"
import { GetDownloadLink } from "../utils/Sends"
import { toast } from "react-toastify";

const Playback = ({ src, Title, setCurrentTime, duration }) => {
    const { data: session } = useSession()


    const url = `${window.location.origin}/api/playback?link=${encodeURIComponent(src)}&title=${encodeURIComponent(Title)}`
    const { togglePlayPause, playing, load, getPosition, mute, muted , error} = useAudioPlayer()
    const [loaded, setLoaded] = useState(false)
    const [progress, setProgress] = useState("0:00")


    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        if(error) toast.error("Lamento mas a musica tem mais de 4 minutos e devido as limitações não foi possivel fazer o stream", {theme: 'dark'})   
    }, [error])

    useEffect(() => {
        load(url, {
            autoplay: true,
            format: 'mp3',
            // html5: true,
            onload: () => setLoaded(true)
        })

       
        console.log('loop', new Date().toISOString())
        const interval = setInterval(() => {
            const position = getPosition()
            setCurrentTime(position)
            setProgress(((position * 1000) / duration) * 100)
        }, 100)

        return () => clearInterval(interval)
    }, [])



    return (
        <>
            <section>
                {
                    loaded ? <>
                        <div className="flex w-[10%] items-center justify-center">
                            <button onClick={togglePlayPause}>
                                {
                                    playing
                                        ? <PauseIcon />
                                        : <PlayIcon />
                                }
                            </button>
                        </div>
                        <div className="w-[80%] h-full flex items-center justify-start font-light text-lg relative">
                            <div className="bg-white/10 w-full h-[4px] absolute" />
                            <div className="h-[2px] bg-white" style={{
                                width: `${progress}%`,
                            }} />
                            <BsCircleFill size={10} />
                        </div>
                        <div className="w-[10%] h-full flex items-center justify-center text-3xl" >
                            <button onClick={() => mute(!muted)}>
                                {
                                    !muted
                                        ? <BsFillVolumeUpFill />
                                        : <BsFillVolumeMuteFill />
                                }
                            </button>
                        </div>
                    </>
                    : error ? 
                        <h1 className="text-2xl font-mono text-red-600 animate-pulse">Error</h1>
                    : <h1 className="text-2xl font-mono text-white animate-pulse">LOADING...</h1>
                }
            </section>

            <button id="buttondwn" onClick={() => GetDownloadLink(src, Title, session?.user?.email)} className="download-button">
                <Download size={30} />
            </button>
        </>
    )

}

export default Playback