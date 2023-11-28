import styles from "@/styles/layout.module.scss";
import "@/styles/nav.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/global.scss";

const title = "Portfolio";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <title>{title}</title>
      </head>
      <body>
        <nav className={`${styles.gray}`}>
          <ul>
            <li >
              <h1>Portfolio</h1>
            </li>
            <li>
              <a href="/">トップページに戻る</a>
            </li>
            <li>
              <a href="/works">成果物一覧</a>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
