import { useEffect, useRef, useState } from "react"


const Playback = ({ src, audioRef, setCurrentTime }) => {
    useEffect(() => {
        const audioElement = audioRef.current
        const HandleTimeUpdate = () => setCurrentTime(audioElement.currentTime)

        audioElement.addEventListener("timeupdate", HandleTimeUpdate)
        return () => audioElement.removeEventListener("timeupdate", HandleTimeUpdate)
    }, [])


    return (
        <div>
            <audio ref={audioRef} src={src} controls />
        </div>
    )
}

export default Playback