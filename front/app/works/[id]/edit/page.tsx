"use client";
import styles from "@/styles/page.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function EditPost() {
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
        "https://wtnbjp-portfolio.onrender.com/api/v1/posts",
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

  return (
    <>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <label>title</label>
          <input type="text" onChange={handleTitleChange} />
          <label>content</label>
          <textarea onChange={handleContentChange} />
          <label>images</label>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/gif,image/png"
            onChange={handleImagesChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
