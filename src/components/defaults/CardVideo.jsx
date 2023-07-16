import { useEffect, useState } from 'react';
import Separator from '../utils/Separator';
import { toast } from 'react-toastify';

function CardVideo({ ArrayMusics }) {
  const [indexMusicSelected, setIndexMusicSelected] = useState(0)


  const SetNextMusic = () => {
    if(indexMusicSelected < ArrayMusics.length - 1) {
      setIndexMusicSelected(indexMusicSelected + 1)
    } else {
      setIndexMusicSelected(0)
      toast.info("Não encontrei outras musicas", {
        theme: "dark",
        position: "bottom-right",
      })
    }
  }

  const { Title, Thumbnail, Lyrics, duration } = ArrayMusics[indexMusicSelected]?.name ? ArrayMusics[indexMusicSelected] : {
    Title: 'Nenhuma musica encontrada',
    Thumbnail: '',
    Lyrics: 'Nenhuma letra encontrada',
    duration: 0
  }

  const SetMusicSelected = () => {
    localStorage.setItem("MusicSelected", JSON.stringify({
        Title,
        Thumbnail,
        Lyrics,
        duration
      })
    )

    const RecenttMusics = JSON.parse(localStorage.getItem("RecenttMusics"))

    if(!RecenttMusics) {
        let RecenttMusics = []
        RecenttMusics.push({
          Title,
          Thumbnail,
          Lyrics
        })
        localStorage.setItem("RecenttMusics", JSON.stringify(RecenttMusics)
      )
    } else {
      if(RecenttMusics.length >= 5){
         RecenttMusics.shift({
          Title,
          Thumbnail,
          Lyrics
         })
      } else if(!RecenttMusics.find(e => e.Title === Title)) {
        RecenttMusics.push({
          Title,
          Thumbnail,
          Lyrics
        })
        localStorage.setItem("RecenttMusics", JSON.stringify(RecenttMusics)) 
      }
    }

    window.location.href = '/edit'
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
          <button onClick={SetNextMusic}>
            Não
          </button>
        </div>
      </section>
    </div>
  )
}


export default CardVideo