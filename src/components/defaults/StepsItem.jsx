import Image from 'next/image';

export default function StepsItem({imgUrl, text}) {
    return (
        <section>
            <Image src={imgUrl} className='image'/>
            <span>
                {text}
            </span>
        </section>
    )
}