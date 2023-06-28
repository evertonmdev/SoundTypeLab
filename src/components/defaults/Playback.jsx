import { useEffect } from "react"


const Playback = ({ src, audioRef, Title, setCurrentTime }) => {
    useEffect(() => {
        const audioElement = audioRef.current
        const HandleTimeUpdate = () => setCurrentTime(audioElement.currentTime)

        audioElement.addEventListener("timeupdate", HandleTimeUpdate)
        return () => audioElement.removeEventListener("timeupdate", HandleTimeUpdate)
    }, [])


    return (
        <div>
            <audio autoPlay ref={audioRef} src={`http://${window.location.origin}/api/playback?link=${encodeURIComponent(src)}&title=${encodeURIComponent(Title)}`} controls />
        </div>
    )
}

export default Playback