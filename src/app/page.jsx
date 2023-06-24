"use client";

import RecentVideos from '../components/defaults/RecentVideos';
import Steps from '../components/defaults/Steps';
import Step1 from '../assets/step-1.jpg';
import Step2 from '../assets/step-2.jpg';
import Step3 from '../assets/step-3.jpg';


import Lottie from "lottie-react";
import axios from 'axios';

import { useState } from 'react';
import { ButtonStylized, CardVideo, InputStylized } from '@/components/defaults';
import LoadingAnimation from '@/components/animations/lottie/loading.json'



// CRIAR A FUNÇÃO DE PUXAR A MÚSICAS QUE VOCÊ BAIXOU DDE DENTRO DA PASTA 'youtube'

export default function Home() {
  const [NameMusic, setNameMusic] = useState(null)
  const [ResponseData, setResponseData] = useState(null)
  const [ErrorReq, setErrorReq] = useState(null)

  const [Loading, setLoading] = useState(false)

  const SendReq = async () => {
    setLoading(true)
    await axios.post('/api/posts', {
      name_find: NameMusic
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

  return (
    <main>
      <section className='introduction'>
        <h1>
          Seu site de tipografia
        </h1>
        <p>Baixe vídeos diretamente do YouTube para o formato mp3</p>
        <button>Comece a baixar</button>
      </section>
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
              Videos Recentes
            </h1>
            <div className='video-container'>
              <RecentVideos />
              <RecentVideos />
              <RecentVideos />
              <RecentVideos />
              <RecentVideos />
              <RecentVideos />
            </div>
          </section>
          <section className='video-finder'>
            <div className='finder'>
              <InputStylized onChange={doc => setNameMusic(doc.target.value)} placeholder='Qual o nome da musica?' />
              <ButtonStylized onClick={SendReq}>Pesquisar</ButtonStylized>
            </div>
            <div className='video'>
              {
                Loading ?
                  <div className=''>
                    <Lottie animationData={LoadingAnimation} />
                  </div>
                  : ResponseData ?
                    <CardVideo Title={ResponseData.Title} Thumbnail={ResponseData.Thumbnail}  Lyrics={ResponseData.Lyrics} />
                    : ErrorReq ?
                      <h1 className='text-ColorTwo'>{ErrorReq}</h1>
                      : null
              }
            </div>
          </section>
        </div>
      </section>
      <section className='steps'>
        <h1>
          Passo a passo de como baixar seus vídeos
        </h1>
        <div>
          <Steps
            stepNumber='Passo 1'
            imgUrl={Step1}
            text='Copie o link do vídeo que deseja baixar' />
          <Steps
            stepNumber='Passo 2'
            imgUrl={Step2}
            text='Cole o link copiado dentro da caixa indicada e clique para pesquisar' />
          <Steps
            stepNumber='Passo 3'
            imgUrl={Step3}
            text="Verifique se o vídeo bate com o desejado e clique em 'Sim'" />
        </div>
        <h1>
          Pronto, com isso feito seu download começará imediatamente!
        </h1>
      </section>
    </main>
  )
}


