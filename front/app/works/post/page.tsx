"use client";
import { notFound } from "next/navigation";
import styles from "@/styles/post.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


export default function CreatePost() {
  const isAdmin = Cookies.get("admin")
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[content]", content);
    images.forEach((image: File) => {
      formData.append(`post[images][]`, image); // フォームデータに画像を追加
    });
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // ヘッダーでコンテンツタイプを設定
          },
        }
      );
      console.log(response.data);
      router.push("/works");
    } catch (error) {
      alert("Error creating post");
      console.error(error);
    }
  };

  if (!isAdmin) {
    return notFound();
  } else {
    return (
      <>
        <div>
          <form className={`${styles.form}`}onSubmit={handleSubmit}>
            <label>Title</label>
            <input
              type="text"
              className={`${styles.title}`}
              onChange={handleTitleChange}
            />
            <label>Content</label>
            <textarea
              className={`${styles.textarea}`}
              onChange={handleContentChange}
            />
            <input
              type="file"
              multiple
              accept="image/jpeg,image/gif,image/png"
              onChange={handleImagesChange}
            />
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
}
