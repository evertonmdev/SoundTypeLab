import { InputStylized, LogInGoogleButton } from "@/components/defaults"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link";
import { redirect } from "next/navigation"
import { toast } from "react-toastify";
import { ArrowRightCircle } from "lucide-react";

export default function LogInForm() {

    const { data: session } = useSession()
    if (session) return redirect('/')
    const HandleSubmit = async event => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const credentials = {
            username: formData.get('username'),
            password: formData.get('password')
        }

        const result = await signIn('credentials', {
            callbackUrl: '/',
            redirect: false,
            ...credentials
        })

        if (result.error) toast.error(result.error, {
            theme: 'dark'
        })
        else if (result.ok) toast.success("Logado com sucesso", {
            theme: 'dark',
            autoClose: 1000,
        })
        else toast.error("Erro desconhecido")
    }

    return (
        <section>
            <h1>Login</h1>
            <form onSubmit={HandleSubmit}>
                <InputStylized id="username" type="passemailword" name="username" placeholder="Email" />
                <InputStylized id="password" type="password" name="password" placeholder="Senha" />

                <>
                    <a href="#" class="password-forgotten">Esqueceu sua senha?</a>
                </>

                <div className="login-plugins">
                    <LogInGoogleButton />
                </div>

                <div className="login-button">
                    <button id="button" type="submit">
                        <span>Entrar</span>
                        <ArrowRightCircle />
                    </button>
                </div>
            </form>

            <div className="login-to-register">
                <Link className="link" href="/cadastro">
                    Ainda não possui uma conta? <span>Criar conta.</span>
                </Link>
            </div>
        </section>
    )
}