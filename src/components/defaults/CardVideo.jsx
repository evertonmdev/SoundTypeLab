import Separator from '../utils/Separator';

function CardVideo({ Title, Thumbnail, Lyrics }) {
  const SetMusicSelected = () => {
    localStorage.setItem("MusicSelected", JSON.stringify({
        Title,
        Thumbnail,
        Lyrics
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
          <button>
            Não
          </button>
        </div>
      </section>
    </div>
  )
}


export default CardVideo