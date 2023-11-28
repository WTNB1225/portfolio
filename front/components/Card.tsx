import Link from "next/link";
import Image from "next/image";
import "@/styles/card.scss"

export default function Card({
  id,
  title,
  image
}:{
  id: string,
  title: string,
  image: string
}) {
  return (
  <>
    <div>
      <Link href={`/works/${id}`}>
        <Image 
        alt=""
        src={image}
        height={300}
        width={400}
        />
        <div>
          <h2>{title}</h2>
        </div>
      </Link>
    </div>
  </>
  )
}