import { useSession } from "next-auth/react"
import { LogOutGoogleButton } from ".."
import { useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, UserCircle2, X } from "lucide-react"

const Header = ({ loginState }) => {
  const { data: session } = useSession()
  const [Confirmar, setConfirmar] = useState(false)

  const [login, setLogin] = useState(loginState)

  if (login === null) {
    setLogin(false)
  }

  return (
    <header>
      {
        login ?
          <a href="/" className="logo">
            <h1>SoundTypeLab</h1>
          </a>
          :
          <>
            <a href="/" className="logo">
              <h1>SoundTypeLab</h1>
            </a>
            {
              session ?
                <div className="user">
                  {
                    Confirmar
                      ?
                      <div className="flex gap-3">
                        <LogOutGoogleButton />
                        <button className="close-button" onClick={() => setConfirmar(false)}><X /></button>
                      </div>
                      :
                      <div>
                        <h1>{session.user.name}</h1>
                        <button onClick={() => setConfirmar(true)}><ChevronRight /></button>
                      </div>
                  }
                </div>
                :
                <div className="user">
                  <a href="/login">
                    <UserCircle2 />
                    Entrar
                  </a>
                </div>
            }
          </>
      }

    </header>
  )
}

export default Header