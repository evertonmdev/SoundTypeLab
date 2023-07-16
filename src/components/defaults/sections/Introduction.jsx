export default function Introduction() {
    return (
        <section className='introduction'>
            <h1>
                Seu site de tipografia
            </h1>
            <p>Procure por sua músicas preferidas e tenha uma sincronização perfeita com a letra</p>
            <button onClick={() =>{ 
                window.location.href = '#search'
            }}>Comece a baixar</button>
        </section>
    )
}