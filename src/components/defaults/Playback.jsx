import { ArrowBigDown, Download, PauseIcon, PlayIcon } from "lucide-react"
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs'
import { useEffect, useState } from "react"


import { useAudioPlayer } from "react-use-audio-player"

const Playback = ({ src, Title, setCurrentTime, duration }) => {
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

        console.log('loop', new Date().toISOString())
        const interval = setInterval(() => {
            const position = getPosition()
            setCurrentTime(position)
            setProgress(formatTime(parseFloat(position) * 1000))
        }, 100)

        return () => clearInterval(interval)
    }, [])



    return (
        <div className="w-full h-16 flex justify-center items-center gap-5 ">
            <div className="w-fit h-full px-14 rounded-full bg-gradient-to-br from-rose-900 to-indigo-900 text-white flex justify-between items-center p-4">
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
            </div>

            <button onClick={() => console.log("Callback de download")} className=" p-5 rounded-full  bg-gradient-to-br from-rose-900 to-indigo-900 flex justify-center items-center text-white">
                <Download size={30} />
            </button>
        </div>
    )

}

export default Playback