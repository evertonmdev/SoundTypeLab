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
    <div className='video-box'>
      <section>
        <img src={Thumbnail} />
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
    </div>
  )
}


export default CardVideo