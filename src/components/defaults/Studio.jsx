import Lottie from "lottie-react";
import axios from 'axios';

import { useState } from 'react';
import { ButtonStylized, CardVideo, InputStylized, RecentVideos } from '@/components/defaults';

import LoadingAnimation from '@/components/animations/lottie/loading.json';

export default function Studio() {
    const [NameMusic, setNameMusic] = useState(null)
    const [ResponseData, setResponseData] = useState(null)
    const [ErrorReq, setErrorReq] = useState(null)
    const [RecentsMusics, setRecentsMusics] = useState(false)

    const [Loading, setLoading] = useState(false)

    const SendReq = async () => {
        setLoading(true)
        await axios.post('/api/posts', {
            name_find: NameMusic + " sem introdução"
        }).then(r => {
            setResponseData({
                Title: r.data.title,
                Thumbnail: r.data.thumbnail,
                Lyrics: r.data.lyrics
            })
        }).catch(e => {
            console.log(e)
            setErrorReq("Não foi possivel encontrar a musica ou letra sincronizada indisponivel")
        })
        setLoading(false)
    }

    useEffect(() => {
        const RecentsMusics = localStorage.getItem("RecenttMusics") ? JSON.parse(localStorage.getItem("RecenttMusics")) : false
        console.log(RecentsMusics)
        setRecentsMusics(RecentsMusics)
    }, [])
    return (
        <section className='studio'>
            <div className='title'>
                <h1>
                    Este é o seu estúdio
                </h1>
                <p>
                    Onde a mágica acontece
                </p>
            </div>
            <div>
                <section className='recent-videos'>
                    <h1>
                        Musicas Recentes
                    </h1>
                    <div className='video-container'>
                        {
                            RecentsMusics ? RecentsMusics.map((r, i) => <RecentVideos key={i} Title={r.Title} Thumbnail={r.Thumbnail} Lyrics={r.Lyrics} />)
                                : <h2 className='text-ColorTwo text-sm font-mono h-[500px]'>Experimente buscar uma musica :)</h2>
                        }
                    </div>
                </section>
                <section className='video-finder'>
                    <div className='finder'>
                        <InputStylized type='text' onChange={doc => setNameMusic(doc.target.value)} placeholder='Qual o nome da musica?' />
                        <ButtonStylized onClick={SendReq}>Pesquisar</ButtonStylized>
                    </div>
                    <div className='video'>
                        {
                            Loading ?
                                <>
                                    <Lottie animationData={LoadingAnimation} />
                                </>
                                : ResponseData ?
                                    <CardVideo Title={ResponseData.Title} Thumbnail={ResponseData.Thumbnail} Lyrics={ResponseData.Lyrics} />
                                    : ErrorReq ?
                                        <h1 className='text-ColorTwo'>{ErrorReq}</h1>
                                        : null
                        }
                    </div>
                </section>
            </div>
        </section>
    )
}