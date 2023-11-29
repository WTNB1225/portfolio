"use client";
import styles from "@/styles/login.module.scss";
import Cookies from "js-cookie";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
//import { useGlobalContext } from "@/app/Context/store";
export default function CreatePost() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",name);
    formData.append("password", password)
    try {
      const response = await axios.post(
        "https://wtnbjp-portfolio.onrender.com/api/v1/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // ヘッダーでコンテンツタイプを設定
          },
        }
      );
      if (response.status == 201){
        Cookies.set("admin","true")
        router.push("/admin")
      }
    } catch (error) {
      alert("Error creating post");
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <form className={`${styles.form}`}onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="password"
            className={`${styles.width}`}
            onChange={handleNameChange}
          />
          <label>Password</label>
          <input type="password" className={`${styles.width}`} onChange={handlePasswordChange} />
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
