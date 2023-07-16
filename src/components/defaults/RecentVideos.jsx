import Image from "next/image";

export default function RecentVideos({ Thumbnail, Title }) {
    return (
        <button className='video'>
            <div className='thumbnail'>
                <Image src={Thumbnail} width={400} height={200} className="object-cover w-full h-full" />
            </div>
            <span>{Title}</span>
        </button>
    )
}