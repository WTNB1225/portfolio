"use client"
import Card from "@/components/Card"
import styles from "@/styles/page.module.scss"
import "@/styles/card.scss"
import { useEffect, useState } from "react"

type Data = {
  image: string;
  id:string;
  title:string;
  content:string;
  images_url:string
  created_at:string;
  updated_at: string;
}
//export async function getServerSideProps() {
//  const res = await fetch("http://localhost:3333/api/v1/posts", {cache: 'no-store'});
//  const data :Data[] = await res.json();
//  console.log(data)
//
//  return {props: {data}};
//}

async function getData() {
  const res = await fetch("https://wtnbjp-portfolio.onrender.com/api/v1/posts");
  const data = await res.json();
  return data;
}

export default function Works() {

  const [posts,setPosts] = useState<Data[]>([])

  useEffect(() => {
    getData()
      .then((p) => {
        setPosts(p);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []); // 空の配列を渡すことで、マウント時の初回のみ実行されます

  return(
    <>
    <div>
      
      {posts.map((post) => {
        const imageUrl = post.images_url[0]
        console.log(imageUrl)
        return(
          <div className={`${styles.margin} card ${styles.margintop} ${styles.marginleft}`} key={post.id}>
            <Card key={post.id} title={post.title} id={post.id} image={imageUrl}></Card>
          </div>
        )
      })}
      </div>
    </>
  )
}
