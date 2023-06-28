"use client";

import { Header, RegisterForm } from "@/components/defaults";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const Register = () => {
    const { data: session } = useSession()
    if (session) return redirect('/')
    return (
        <main className="login">
            <Header loginState={true}/>
            <RegisterForm />
        </main>
    )
}

export default Register