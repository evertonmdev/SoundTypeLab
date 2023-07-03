import { useSession } from "next-auth/react"
import { LogOutButton } from ".."
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

            <div>
              <details className="user">
                <summary>
                  Rogerinho
                </summary>
                <div className="logout">
                  <LogOutButton />
                </div>
              </details>
            </div>
          </>
      }

    </header>


    /* session ?
      <div className="user">
        {
          Confirmar
            ?
            <div className="flex gap-3">
              <LogOutButton />
              <button className="close-button" onClick={() => setConfirmar(false)}><X /></button>
            </div>
            :
            <details>
              <summary>
                <h1>{session?.user?.name.split(' ')[0]}</h1>
                <button onClick={() => setConfirmar(true)}><ChevronRight /></button>
              </summary>
            </details>
        }
      </div>
      :
      <div className="user">
        <a href="/login">
          <UserCircle2 />
          Entrar
        </a>
      </div> */


  )
}

export default Header