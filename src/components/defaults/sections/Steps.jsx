import { StepsItem } from '@/components/defaults';

import { Step1, Step2, Step3 } from '@/assets';

export default function Steps () {
    return (
        <section className='steps'>
        <h1>
          Recomendações para uma melhor utilização
        </h1>
        <div>
          
          <StepsItem
            title='Pesquisar músicas'
            imgUrl={Step1}
            text='Para uma melhor busca, insira o nome da música e o artista' />
          <StepsItem
            title='Tipografia'
            imgUrl={Step2}
            text="Assim que for encontrado clique em 'Sim' que automaticamente você será redirecionado" />
          <StepsItem
            title='Baixar as músicas'
            imgUrl={Step3}
            text="Caso esteja logado, você terá acesso ao download da música" />
        </div>
        <h1>
          Pronto! Com isso feito você pode aproveitar sua música
        </h1>
      </section>
    )
}