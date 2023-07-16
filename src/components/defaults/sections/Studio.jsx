import Lottie from "lottie-react";
import axios from 'axios';

import { useState, useEffect } from 'react';
import { ButtonStylized, CardVideo, InputStylized, RecentVideos } from '@/components/defaults';

import LoadingAnimation from '@/components/animations/lottie/loading.json';

export default function Studio() {
    const [NameMusic, setNameMusic] = useState(null)
    const [ResponseData, setResponseData] = useState({
        ArrayMusics: null
    })
    const [ErrorReq, setErrorReq] = useState(null)
    const [RecentsMusics, setRecentsMusics] = useState(false)

    const [Loading, setLoading] = useState(false)

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            SendReq();
        }
    }

    const SendReq = async () => {
        setLoading(true)
        setErrorReq(null)
        setResponseData({
            ArrayMusics: null
        })

        await axios.post('/api/posts', {
            name_find: NameMusic
        }).then(r => {
            if (!r.data?.arrayMusics[0]) {
                setErrorReq("Não foi possivel encontrar a musica ou letra sincronizada indisponivel")
            }
            setResponseData({
                ArrayMusics: r.data.arrayMusics
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
        <section className='studio' id="search">
            <div className='title'>
                <h1>
                    Este é o seu estúdio
                </h1>
                <span>
                    Onde a mágica acontece
                </span>
            </div>
            <div className='container'>
                <section className='recent-videos'>
                    <h1>
                        Musicas Recentes
                    </h1>
                    <div className='video-container'>
                        {
                            RecentsMusics ? RecentsMusics.map((r, i) => <RecentVideos key={i} Title={r.Title} Thumbnail={r.Thumbnail} Lyrics={r.Lyrics} />)
                                : <p>Você ainda não pesquisou por músicas</p>
                        }
                    </div>
                </section>
                <section className='video-finder'>
                    <div className='finder'>
                        <InputStylized type='text' searchReq={handleEnter} onChange={doc => setNameMusic(doc.target.value)} placeholder='Qual o nome da musica?' />
                        <ButtonStylized onClick={SendReq}>Pesquisar</ButtonStylized>
                    </div>
                    <div className='video'>
                        {
                            Loading ?
                                <>
                                    <Lottie autoSize resizeMode='center' style={{ width: '50%' }} animationData={LoadingAnimation} />
                                </>
                                : ErrorReq ?
                                    <h1 className='text-ColorTwo'>{ErrorReq}</h1>
                                    : ResponseData.ArrayMusics ?
                                        <CardVideo ArrayMusics={ResponseData.ArrayMusics} />
                                        : null
                        }
                    </div>
                </section>
            </div>
        </section>
    )
}