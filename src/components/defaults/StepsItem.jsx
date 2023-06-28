import Image from 'next/image';

export default function StepsItem({imgUrl, text, title}) {
    return (
        <section>
            <h1>
                {title}
            </h1>
            <Image src={imgUrl} className='image'/>
            <span>
                {text}
            </span>
        </section>
    )
}