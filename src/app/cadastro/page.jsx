"use client";

import { SendCadastro } from "@/components/utils/Sends";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const Login = () => {
    const { data: session } = useSession()
    if (session) return redirect('/')

    const Send = async event => SendCadastro(event)

    return (
        <main className="w-screen h-screen justify-center items-center flex">
            <div className="w-2/5 h-5/6 bg-stone-800 rounded-xl">
                <h1 className="text-4xl text-stone-100 w-full text-center my-10">Cadastro</h1>
                <div className="flex flex-col justify-center items-center gap-3">
                    <input id="username" className="w-3/5 p-2 rounded-xl bg-stone-700 text-stone-100" type="text" placeholder="Username" required />
                    <input id="email" className="w-3/5 p-2 rounded-xl bg-stone-700 text-stone-100" type="email" required placeholder="Email" />
                    <input id="password" className="w-3/5 p-2 rounded-xl bg-stone-700 text-stone-100" type="password" required placeholder="Senha" />
                    <div className="w-3/5 flex justify-between items-center ">
                        <button id="button" onClick={Send} className="w-1/5 h-12 rounded-xl bg-stone-700 text-stone-100">Entrar</button>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Login