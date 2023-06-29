"use client";

import { Download, PauseIcon, PlayIcon } from "lucide-react"
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs'
import { useEffect, useState } from "react"

import { useSession } from "next-auth/react";

import { useAudioPlayer } from "react-use-audio-player"
import { GetDownloadLink } from "../utils/Sends"

const Playback = ({ src, Title, setCurrentTime, duration }) => {
    const { data: session } = useSession()


    const url = `${window.location.origin}/api/playback?link=${encodeURIComponent(src)}&title=${encodeURIComponent(Title)}`
    const { togglePlayPause, playing, load, getPosition, mute, muted } = useAudioPlayer()
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
        load(url, {
            autoplay: true,
            format: 'webm',
            // html5: true,
            onload: () => setLoaded(true)
        })

        console.log(session)
        console.log('loop', new Date().toISOString())
        const interval = setInterval(() => {
            const position = getPosition()
            setCurrentTime(position)
            setProgress(formatTime(parseFloat(position) * 1000))
        }, 100)

        return () => clearInterval(interval)
    }, [])



    return (
        <>
            <section>
                {
                    loaded ? <>
                        <div className="flex w-1/5 items-center justify-center">
                            <button onClick={togglePlayPause}>
                                {
                                    playing
                                        ? <PauseIcon />
                                        : <PlayIcon />
                                }
                            </button>
                        </div>
                        <div className="w-18 h-full flex items-center justify-start px-5 font-light text-lg">
                            {
                                progress
                            }
                        </div>
                        <div className="w-1/5 h-full flex items-center justify-center text-3xl" >
                            <button onClick={() => mute(!muted)}>
                                {
                                    !muted
                                        ? <BsFillVolumeUpFill />
                                        : <BsFillVolumeMuteFill />
                                }
                            </button>
                        </div>
                    </>
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