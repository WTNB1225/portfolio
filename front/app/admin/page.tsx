"use client";
import Cookies from "js-cookie";
import style from "@/styles/admin.module.scss"
import axios from "axios";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
const fetchData = async () => {
  const res = await fetch("https://wtnbjp-portfolio.onrender.com/api/v1/posts");
  const posts = await res.json();
  return posts;
};

const destroy = async (id: string) => {
  try {
    const response = axios.delete(`https://wtnbjp-portfolio.onrender.com/api/v1/posts/${id}`);
  } catch (e) {
    console.log(e);
  }
};

export default function Admin() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<File[]>([])
  const [content, setContent] = useState("");
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const isAdmin = Cookies.get("admin");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleImagesChange = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      setImages(Array.from(e.target.files));
    }
  }

  const hadnleButtonClick = () => {
    if(isShowEdit){
      setIsShowEdit(false)
    }
    setIsShowDelete(true);
  };

  const handleEditButtonClick = () => {
    if(isShowDelete){
      setIsShowDelete(false)
    }
    setIsShowEdit(true);
  };

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const formEdit = new FormData();
    formData.append("name", name);
    formData.append("password", password);
    formEdit.append("post[title]", title);
    formEdit.append("post[content]",content);
    images.forEach((image:File) => {
      formEdit.append("post[images][]",image)
    });
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // ヘッダーでコンテンツタイプを設定
          },
        }
      );
      if (response.status == 201) {
        try {
          const res = await axios.patch(
            `https://wtnbjp-portfolio.onrender.com/api/v1/posts/${id}`,
            formEdit,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setIsShowEdit(false);
        } catch (e) {
          console.log(e);
          alert("Error editing post");
        }
      }
    } catch (e) {
      console.log(e);
      alert("Auth error");
    }
  };

  const handleDeleteSumit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);
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
      if (response.status == 201) {
        await destroy(id);
        setIsShowDelete(false);
      }
    } catch (error) {
      alert("Auth error");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData()
      .then((p) => {
        setPosts(p);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []); // 空の配列を渡すことで、マウント時の初回のみ実行されます
  console.log(posts);

  if (isAdmin) {
    return (
      <>
      <div className={`${style.center}`}>
        <h1>管理者専用画面</h1>
        {posts.map((post) => {
          console.log(post);
          return (
            <div key={post["id"]}>
              <div id={`${post["id"]}`}>
                <span>
                  <h1>{post["title"]}</h1>
                  <button
                    onClick={() => {
                      hadnleButtonClick();
                      setId(post["id"]);
                    }}
                  >
                    削除
                  </button>
                  <button
                    onClick={() => {
                      handleEditButtonClick();
                      setId(post["id"]);
                    }}
                  >
                    編集
                  </button>
                </span>
                <p>-------------------------------</p>
              </div>
            </div>
          );
        })}
        {isShowDelete && (
          <div>
            <form className={`${style.form}`} onSubmit={handleDeleteSumit}>
              <label>Username</label>
              <input type="text" className={`${style.width}`} onChange={handleNameChange} />
              <label>Password</label>
              <input type="password" className={`${style.width}`} onChange={handlePasswordChange} />
              <button type="submit">削除</button>
            </form>
          </div>
        )}
        {isShowEdit && (
          <>
            <div>
              <form className={`${style.form}`} onSubmit={handleEditSubmit}>
                <label>Username</label>
                <input type="text" onChange={handleNameChange} />
                <label>Password</label>
                <input type="password" onChange={handlePasswordChange} />
                <label>Title</label>
                <input type="text" onChange={handleTitleChange} />
                <label>Content</label>
                <input type="text" onChange={handleContentChange} />
                <input type="file" className={style.file} onChange={handleImagesChange} multiple accept="image/jpeg,image/gif,image/png" />
                <button type="submit">編集</button>
              </form>
            </div>
          </>
        )}
        </div>
      </>
    );
  } else {
    return notFound();
  }
}
