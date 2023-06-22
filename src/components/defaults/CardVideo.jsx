import Image from 'next/image';
import { ButtonStylized } from '.';
import axios from 'axios';

function CardVideo({ Title, Thumbnail, Formats }) {
    return (
     <div className='w-[50vw] h-1/2 relative flex justify-center items-center gap-3 p-5'>
       <Image 
         src={Thumbnail}
         width={500}
         height={500}
         className='object-cover w-1/2 h-[100%] rounded-xl'
       />
       <div className='flex flex-col h-full w-full gap-4'>
         <h1 className={"text-ColorTwo text-xl text-center col-span-2 underline"}>{Title}</h1> 
         <span className='pl-4 col-span-2 text-lg font-light text-ColorTwo mt-1'>Correto?</span>
         <div className='flex justify-around items-center mt-2'>
           <a href={`api/download?url=${encodeURIComponent(Formats[0].url)}&title=${encodeURIComponent(Title)}`} className={`bg-ColorTree p-[12px] text-ColorTwo rounded-lg hover:scale-x-110 transition-all`}>
                Sim
           </a>
           <ButtonStylized onClick={() => console.log("oi")} padding={"12px"}>
                Não
           </ButtonStylized>
         </div>
         
       </div>
     </div>
    )
 }


export default CardVideo