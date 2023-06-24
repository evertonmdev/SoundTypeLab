"use client";

import ReactTyped from 'react-typed';
import Lottie from "lottie-react";
import { useState } from 'react';

import { motion } from 'framer-motion';
import axios from 'axios';

import { OpenCortina } from '@/components/animations/framerMotion/Home';
import { ButtonStylized, CardVideo, InputStylized } from '@/components/defaults';

import '../styles/styles.scss';
import RecentVideos from '../components/defaults/RecentVideos';
import Steps from '../components/defaults/Steps';
import Step1 from '../assets/step-1.jpg';
import Step2 from '../assets/step-2.jpg';
import Step3 from '../assets/step-3.jpg';

import LoadingAnimation from '@/components/animations/lottie/loading.json'

// CRIAR A FUNÇÃO DE PUXAR A MÚSICAS QUE VOCÊ BAIXOU DDE DENTRO DA PASTA 'youtube'

export default function Home() {
  const [Link, setLink] = useState(null)
  const [ResponseData, setResponseData] = useState(null)
  const [ErrorReq, setErrorReq] = useState(null)

  const [Loading, setLoading] = useState(false)

  const SendReq = async () => {
    setLoading(true)
    const res = await axios.post('/api/posts', {
      link: Link
    }).then(r => r).catch(e => setErrorReq(true))
    setLoading(false)
    setResponseData({
      Title: res.data.title,
      Thumbnail: res.data.thumbnail,
      Formats: res.data.formats
    })
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
              <InputStylized onChange={doc => setLink(doc.target.value)} placeholder='Cole seu link aqui' />
              <ButtonStylized onClick={SendReq}>Pesquisar</ButtonStylized>
            </div>
            <div className='video'>
              {
                Loading ?
                  <div className=''>
                    <Lottie animationData={LoadingAnimation} />
                  </div>
                  : ResponseData ?
                    <CardVideo Title={ResponseData.Title} Thumbnail={ResponseData.Thumbnail} Formats={ResponseData.Formats} />
                    : ErrorReq ?
                      <h1 className='text-ColorTwo'>Ocorreu um erro ao tentar encontrar o Link, por favor recarregue a pagina</h1>
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


