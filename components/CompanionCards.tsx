import Link from "next/link";
import Image from "next/image";

interface CompanionCardsProps {
  id: string;
  name: string;
  topic: string;
  duration: number;
  color: string;
  subject: string;
}

const CompanionCards = ({id,name,topic,duration,color,subject}:CompanionCardsProps) => {
  return (
   <article className="companion-card" style={{backgroundColor:color}}>
    <div className="flex items-center justify-between">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark">
            <Image src="/icons/bookmark.svg" alt="bookmark" width={12.5} height={15}/>
        </button>
      
    </div>  <h2 className="text-2xl font-bold">{name}</h2>
    <p className="text-sm">{topic}</p>
<div className="flex items-center gap-2">
    <Image src="/icons/clock.svg" alt="duration" width={12} height={12}/>
    <p className="text-sm">{duration} mins duration</p>
</div>
<Link href={`/companions/${id}`} className="w-full">
<button className="btn-primary w-full justify-center">Launch</button>
</Link> 
   </article>
  )
}

export default CompanionCards