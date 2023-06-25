import { useSession } from "next-auth/react"
import { LogOutGoogleButton } from "."
import { useState } from "react"
import { UserCircle2 } from "lucide-react"

const Header = () => {
  const { data: session } = useSession()
  const [Confirmar, setConfirmar] = useState(false)

  return (
    <header>
      <a href="/" className="logo">
        <h1>SoundTypeLab</h1>
      </a>
      {
        session ?
          <div className="flex gap-2">
            {
              Confirmar
                ?
                <div className="flex gap-3">
                  <LogOutGoogleButton />
                  <button className={"bg-emerald-600 p-2 px-4 rounded-lg text-white font-mono hover:scale-110 transition-all"} onClick={() => setConfirmar(false)}>Back</button>
                </div>
                :
                <div>
                  <h1>{session.user.name}</h1>
                  <button className="text-white" onClick={() => setConfirmar(true)}>Sair</button>
                </div>
            }
          </div>
          :
          <div>
            <a href="/login">
              <UserCircle2 size={20} />
              Entrar
            </a>
          </div>
      }
    </header>
  )
}

export default Header