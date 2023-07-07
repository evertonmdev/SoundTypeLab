import Image from 'next/image';

export default function StepsItem({ imgUrl, text, title }) {
    return (
        <details>
            <summary>
                {title}
            </summary>
            <Image src={imgUrl} />
            <span>
                {text}
            </span>
        </details>
    )
}