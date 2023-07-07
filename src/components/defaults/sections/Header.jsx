import { useSession } from "next-auth/react";
import { LogOutButton } from "..";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, UserCircle2, ArrowLeft } from "lucide-react";

import * as Collapsible from '@radix-ui/react-collapsible';
import { usePathname } from "next/navigation";

const Header = ({ loginState }) => {
  const { data: session } = useSession()
  const [login, setLogin] = useState(loginState)

  const [iconSize] = useState(22);

  if (login === null) {
    setLogin(false)
  }

  const [open, setOpen] = useState(false);

  const pathname = usePathname()

  console.log(pathname)

  return (
    <header>
      {
        login ?
          <div className="container-logo">
            {
              pathname !== "/" ?
              <Link href="/" className="go-back">
                    <ArrowLeft />
              </Link>
              : null
            }
            <a href="/" className="logo">
              <h1>SoundTypeLab</h1>
            </a>
          </div>
          :
          <>
          <div className="container-logo">
            {
              pathname !== "/" ?
              <Link href="/" className="go-back hover:scale-110 transition-all">
                    <ArrowLeft />
              </Link>
              : null
            }
            <a href="/" className="logo">
              <h1>SoundTypeLab</h1>
            </a>
          </div>
            <Collapsible.Root className="collapsible" open={open} onOpenChange={setOpen}>
              {session ?
                <>
                  <Collapsible.Trigger asChild>
                    <div className='container'>
                      <button>
                        {session?.user?.name.split(' ')[0]}
                      </button>
                      {open ? <ChevronRight size={iconSize} /> : <ChevronDown size={iconSize} />}
                    </div>
                  </Collapsible.Trigger>
                  <Collapsible.Content className="content">
                    <div className='container logout'>
                      <LogOutButton size={iconSize}/>
                    </div>
                  </Collapsible.Content>
                </>
                :
                <Link className='container' href="/login">
                  <div>
                    <UserCircle2 size={iconSize} />
                    Entrar
                  </div>
                </Link>
              }
            </Collapsible.Root>
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
       */


  )
}

export default Header;