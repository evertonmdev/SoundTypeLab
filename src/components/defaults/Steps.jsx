import { StepsItem } from ".";

import { Step1, Step2, Step3 } from '@/assets';

export default function Steps () {
    return (
        <section className='steps'>
        <h1>
          Passo a passo de como baixar seus vídeos
        </h1>
        <div>
          <StepsItem
            stepNumber='Passo 1'
            imgUrl={Step1}
            text='Copie o link do vídeo que deseja baixar' />
          <StepsItem
            stepNumber='Passo 2'
            imgUrl={Step2}
            text='Cole o link copiado dentro da caixa indicada e clique para pesquisar' />
          <StepsItem
            stepNumber='Passo 3'
            imgUrl={Step3}
            text="Verifique se o vídeo bate com o desejado e clique em 'Sim'" />
        </div>
        <h1>
          Pronto, com isso feito seu download começará imediatamente!
        </h1>
      </section>
    )
}