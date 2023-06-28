"use client";

import { Header, RegisterForm } from "@/components/defaults";
import { SendCadastro } from "@/components/utils/Sends";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const Register = () => {
    const { data: session } = useSession()
    if (session) return redirect('/')

    const Send = async event => SendCadastro(event)

    return (
        <main className="login">
            <Header loginState={true}/>
            <RegisterForm />
        </main>
    )
}

export default Register