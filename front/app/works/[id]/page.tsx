"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/page.module.scss";

type Data = {
  image: string;
  id: string;
  title: string;
  content: string;
  images_url: string;
  created_at: string;
  updated_at: string;
};

async function getImagesData(path_id:string) {
  const res = await fetch(`http://localhost:4000/api/v1/posts/${path_id}`);
  const data = await res.json();
  const dataurl = data.images_url;
  const title = data.title;
  const content = data.content;
  return { dataurl, title, content };
}

export default function WorkPages() {
  const pathname = usePathname();
  const path_id = pathname.split("/")[2];
  const [url, setUrl] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    getImagesData(path_id)
      .then((p) => {
        setUrl(p["dataurl"])
        setTitle(p.title);
        setContent(p.content);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <>
      <div className={styles.margin}>
        <h1>{title}</h1>
        <p className={`${styles.ptag} ${styles.whitespace}`}>{content}</p>
        {url.map((post: any) => {
          return (
            <Image key={post} src={post} width={400} height={300} alt="" />
          );
        })}
      </div>
    </>
  );
}
