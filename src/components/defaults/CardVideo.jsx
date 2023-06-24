import Image from 'next/image';
import { ButtonStylized } from '.';
import axios from 'axios';

import '../../styles/styles.scss';
import Separator from '../utils/Separator';

function CardVideo({ Title, Thumbnail, Formats }) {
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
          Deseja salvar este vídeo?
        </p>
        <div className='buttons'>
        <a href={`api/download?url=${encodeURIComponent(Formats[0].url)}&title=${encodeURIComponent(Title)}`}>
          Sim
        </a>
          <Separator />
          <a>
            Não
          </a>
        </div>
      </section>
    </>
  )
}


export default CardVideo