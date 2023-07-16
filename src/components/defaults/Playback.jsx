"use client";



import { Download, PauseIcon, PlayIcon } from "lucide-react"
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs'
import { useEffect, useState } from "react"

import { useSession } from "next-auth/react";

import { useGlobalAudioPlayer } from "react-use-audio-player"
import { GetDownloadLink } from "../utils/Sends"
import { toast } from "react-toastify";
import SliderVol from "../utils/Slider";
import SliderPlayback from "../utils/SliderPlayback";

const Playback = ({ src, Title, setCurrentTime }) => {
    const { data: session } = useSession()

    const url = `${window.location.origin}/api/playback?link=${encodeURIComponent(src)}&title=${encodeURIComponent(Title)}`
    const { togglePlayPause, playing, load, getPosition, mute, muted, error, setVolume, volume, duration, isReady, seek } = useGlobalAudioPlayer()
    const [loaded, setLoaded] = useState(false)
    const [progress, setProgress] = useState(0)
    const [oneSecond,setOneSecond] = useState(0)

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
            format: 'mp3',
        })
    }, [])

    useEffect(() => {
        if(isReady) {
            setLoaded(true)
            setOneSecond(duration / 100)
            
            const interval = setInterval(() => {
                const position = getPosition()
                setCurrentTime(position)
                setProgress((position / duration) * 100)
            }, 100)

            return () => clearInterval(interval)
        }
    }, [isReady])

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
                           <SliderPlayback onSecond={progress} onChange={value => {
                            let PercetageToSecond = parseFloat(oneSecond * value[0])
                            console.log("indo para o segundo", PercetageToSecond, getPosition())
                            seek(PercetageToSecond)
                           }} className={"w-full h-full z-10"} />


                           <span className="flex w-fit gap-1 items-center justify-center text-sm font-light px-2">
                            <span>
                                {formatTime(getPosition() * 1000)}
                            </span>
                            <span className="max-sm:hidden">
                                /
                            </span>
                            <span className="max-sm:hidden">
                                {formatTime(duration * 1000)}
                            </span>
                           </span>
                        </div>
                        <div className="group flex flex-col justify-center items-center w-[10%] h-fit relative transition-all" >
                            <button onClick={() => mute(!muted)}>
                                {
                                    !muted
                                        ? <BsFillVolumeUpFill />
                                        : <BsFillVolumeMuteFill />
                                }

                            </button>
                            <SliderVol formClass={"group-hover:flex hidden absolute top-6 box-content p-2 hover:flex"} className={"w-2 h-14 transition-all"} onChange={value => setVolume(value[0] / 100)} />    
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