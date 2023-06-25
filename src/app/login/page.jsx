"use client";

import { InputStylized, LogInGoogleButton } from "@/components/defaults"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

import { HeaderLogin } from '@/components/defaults/Header';

import '@/styles/styles.scss';

const Login = () => {
    const { data: session } = useSession()
    if (session) return redirect('/')

    return (
        <main className="login">
            <HeaderLogin />

            <section>
                <h1>Login</h1>
                <InputStylized type='text' placeholder="Email"/>
                <InputStylized type='password' placeholder="Senha"/>
                <div className="login-plugins">
                    <LogInGoogleButton />
                </div>
                <div className="login-button">
                    <button>Entrar</button>
                </div>
                <div className="login-to-register">
                    <a>
                        Ainda não possui uma conta? <span>Criar conta.</span>
                    </a>
                </div>
            </section>
        </main>
    )
}

export default Login;