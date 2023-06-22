"use client";

import ReactTyped from 'react-typed';
import Lottie from "lottie-react";
import { useState } from 'react';

import { motion } from 'framer-motion';
import axios from 'axios';

import { OpenCortina } from '@/components/animations/framerMotion/Home';
import { ButtonStylized, CardVideo, InputStylized } from '@/components/defaults';


import LoadingAnimation from '@/components/animations/lottie/loading.json'


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
    <main className="bg-ColorTree w-screen h-screen  flex justify-center items-center relative">
        <motion.div id="CortinaDivPrincipal" className='w-[0%] h-full hidden absolute bg-ColorOne justify-start pt-10 items-center flex-col gap-5'>
          <h2 className='text-ColorTwo'>Preparando as coisas....</h2>
          <InputStylized onChange={doc => setLink(doc.target.value)}  placeholder='Cole o link da musica aqui' width={"50vw"} padding="1rem"  />
          <ButtonStylized onClick={SendReq} padding="0.5rem"> Criar </ButtonStylized>
          {
            Loading ?
            <div className='w-[20vw] h-1/2 relative flex justify-center items-center gap-3 p-5'>
              <Lottie animationData={LoadingAnimation} />
            </div>
            : ResponseData  ?
              <CardVideo Title={ResponseData.Title} Thumbnail={ResponseData.Thumbnail} Formats={ResponseData.Formats}  />
            : ErrorReq ?
              <h1 className='text-ColorTwo'>Ocorreu um erro ao tentar eencontrar o Link, por favor recarregue a pagina</h1>
            : null
          }
        </motion.div>

        <ReactTyped 
          strings={[
            "Seja bem vindo a SoundTypeLab",
            "Aqui você pode criar a tipografia do som que você quiser",
          ]}
          loop={true}
          loopCount={1}
          typeSpeed={40}
          backDelay={1000}
          className="text-ColorTwo font-medium text-2xl ml-10"
          onComplete={OpenCortina}
        />
    </main>
  )
}


