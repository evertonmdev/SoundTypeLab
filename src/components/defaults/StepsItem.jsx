import Image from 'next/image';

export default function StepsItem(props) {
    return (
        <section>
            <h1>
                {props.stepNumber}
            </h1>
            <Image src={props.imgUrl} className='image'/>
            <span>
                {props.text}
            </span>
        </section>
    )
}