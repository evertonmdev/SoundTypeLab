import { SendCadastro } from "@/components/utils/Sends";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { InputStylized, LogInGoogleButton } from ".";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

export default function RegisterForm() {

    const { data: session } = useSession()
    if (session) return redirect('/')

    const Send = async event => SendCadastro(event)

    return (
        <section>
            <h1>Cadastro</h1>
            <form onSubmit={Send}>
                <InputStylized id="username" className="w-3/5 p-2 rounded-xl bg-stone-700 text-stone-100" type="text" required={true} placeholder="Username" />
                <InputStylized id="email" className="w-3/5 p-2 rounded-xl bg-stone-700 text-stone-100" type="email" required={true}  placeholder="Email" />
                <InputStylized id="password" className="w-3/5 p-2 rounded-xl bg-stone-700 text-stone-100" type="password" required={true}  placeholder="Senha" />
                <div className="login-plugins">
                    <LogInGoogleButton />
                </div>

                <div className="login-button">
                    <button id="button" type="submit">
                        <span>Criar conta</span>
                        <ArrowRightCircle />
                    </button>
                </div>
            </form>
            <div className="login-to-register">
                <Link className="link" href="/login">
                    Já possui uma conta? <span>Logar.</span>
                </Link>
            </div>
        </section>
    )
}
