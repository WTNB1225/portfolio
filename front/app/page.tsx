import styles from "@/styles/page.module.scss";

export default function TopPage() {
  return (
    <div className={`top-container ${styles.center}`}>
      <div>
        <h1>自己紹介</h1>
        <p className={styles.ptag}>名前 : 渡邉 佑樹</p>
        <p className={styles.ptag}>使用言語 : JavaScript, Python, Ruby</p>
      </div>
    </div>
  );
}
