import Image from 'next/image';
import Separator from '../utils/Separator';

function CardVideo({ Title, Thumbnail, Lyrics }) {
  const SetMusicSelected = () => {
    localStorage.setItem("MusicSelected", JSON.stringify({
        Title,
        Thumbnail,
        Lyrics
      })
    )

   window.location.href = "/edit"
}
  


  return (
    <>
      <section>
        <Image src={Thumbnail} width={400} height={200}/>
        <span>
          {Title}
        </span>
      </section>
      <section>
        <p>
          Deseja usar esta musica?
        </p>
        <div className='buttons'>
        <button onClick={SetMusicSelected}>
          Sim
        </button>
          <Separator />
          <button>
            Não
          </button>
        </div>
      </section>
    </>
  )
}


export default CardVideo