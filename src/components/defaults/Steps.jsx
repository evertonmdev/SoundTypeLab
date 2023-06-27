import Image from 'next/image';

export default function RecentVideos(props) {
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