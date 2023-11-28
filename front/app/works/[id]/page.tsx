"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/page.module.scss";

export type Data = {
  image: string;
  id: string;
  title: string;
  content: string;
  images_url: string;
  created_at: string;
  updated_at: string;
};

export async function getImagesData() {
  const pathname = usePathname();
  const path_id = pathname.split("/")[2];
  const res = await fetch(`http://localhost:4000/api/v1/posts/${path_id}`);
  const data = await res.json();
  const dataurl = data.images_url;
  const title = data.title;
  const content = data.content;
  return { dataurl, title, content };
}

export default async function WorkPages() {
  const datas = await getImagesData();
  const data = datas.dataurl;
  const title = datas.title;
  const content = datas.content;
  return (
    <>
      <div className={styles.margin}>
        <h1>{title}</h1>
        <p className={`${styles.ptag} ${styles.whitespace}`}>{content}</p>
        {data.map((post: any) => {
          return (
            <Image key={post} src={post} width={400} height={300} alt="" />
          );
        })}
      </div>
    </>
  );
}
