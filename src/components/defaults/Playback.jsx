"use client";



import { Download, PauseIcon, PlayIcon } from "lucide-react"
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs'
import { useEffect, useState } from "react"

import { useSession } from "next-auth/react";

import { useAudioPlayer } from "react-use-audio-player"
import { GetDownloadLink } from "../utils/Sends"
import { toast } from "react-toastify";
import SliderDemo from "../utils/Slider";
import SliderPlayback from "../utils/SliderPlayback";

const Playback = ({ src, Title, setCurrentTime, duration }) => {
    const { data: session } = useSession()

    const url = `${window.location.origin}/api/playback?link=${encodeURIComponent(src)}&title=${encodeURIComponent(Title)}`
    const { togglePlayPause, playing, load, getPosition, mute, muted, error, setVolume, volume } = useAudioPlayer()
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
        if (error) {
            console.log(error)
            console.log("One day you daya")
            toast.error("Lamento mas a musica tem mais de 4 minutos e devido as limitações não foi possivel fazer o stream", { theme: 'dark' })
        }
    }, [error])

    
    useEffect(() => {
        load(url, {
            // autoplay: true,
            format: 'mp3',
            html5: true,
            onload: () => setLoaded(true)
        })

        const interval = setInterval(() => {
            const position = getPosition()
            setCurrentTime(position)
            setProgress(((position * 1000) / duration) * 100)
        }, 100)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if(volume === 0) mute(true)
        else mute(false)
    }, [volume])



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
                        <div className="w-4/5 h-full flex relative">
                           <SliderPlayback onSecond={progress} className={"w-full h-full z-10"} />
                        </div>
                        <div className="group flex flex-col justify-center items-center w-[10%] h-fit relative transition-all" >
                            <button onClick={() => mute(!muted)}>
                                {
                                    !muted
                                        ? <BsFillVolumeUpFill />
                                        : <BsFillVolumeMuteFill />
                                }

                            </button>
                            <SliderDemo formClass={"group-hover:flex hidden absolute top-6 box-content p-2 hover:flex"} className={"w-2 h-14 transition-all"} onChange={value => setVolume(value[0] / 100)} />    
                        </div>
                    </>
                        : error ?
                        <h1 className="text-2xl font-mono text-red-600 animate-pulse">Error</h1>
                        : <h1 className="text-2xl font-mono text-white animate-pulse">Carregando...</h1>
                }
            </section>

            <button id="buttondwn" onClick={() => GetDownloadLink(src, Title, session?.user?.email)} className="download-button">
                <Download size={30} />
            </button>
        </>
    )

}

export default Playback