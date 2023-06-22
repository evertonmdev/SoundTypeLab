import Separator from "../utils/Separator"

const Header = () => {
  return (
    <header className="w-screen h-16 flex bg-ColorOne px-10 items-center justify-between">
        <h1 className=" font-bold text-2xl bg-gradient-to-r to-[#FF8C00]/80 from-ColorTree text-transparent bg-clip-text ">SoundTypeLab</h1>
        <div className="flex justify-center items-center gap-5 text-ColorTwo">
            <button className="hover:scale-110 transition-all">Login</button>
            <Separator />
            <button className="hover:scale-110 transition-all">Criar conta</button>
        </div>
    </header>
  )
}

export default Header