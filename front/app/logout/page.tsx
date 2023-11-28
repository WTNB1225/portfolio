"use client";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "@/styles/login.module.scss";

export default function Logout() {
  const isAdmin = Cookies.get("admin")
  const router = useRouter();
  const logout = () => {
    Cookies.remove("admin");
    router.push("/");
  };
  if (isAdmin) {
    return (
      <button type="button" className={styles.center} onClick={logout}>
        ログアウト
      </button>
    );
  } else {
    return(
      notFound()
    )
  }
}
