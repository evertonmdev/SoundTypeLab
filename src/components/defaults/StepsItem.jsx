import Image from 'next/image';

export default function StepsItem({ imgUrl, text, title }) {
    return (
        <section>
            <details>
                <summary>
                    {title}
                </summary>
                <Image src={imgUrl} className='image' />
                <span>
                    {text}
                </span>
            </details>
        </section>
    )
}