"use client";

import { Steps, Introduction, Studio, Header } from "@/components/defaults"

// CRIAR A FUNÇÃO DE PUXAR A MÚSICAS QUE VOCÊ BAIXOU DDE DENTRO DA PASTA 'youtube'

export default function Home() {
  return (
    <main>
      <Header />
      <Introduction />
      <Studio />
      <Steps />
    </main>
  )
}

