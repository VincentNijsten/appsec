import Head from "next/head";
import Image from "next/image";
import Header from "../components/header";
import styles from "../styles/Home.module.css";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>VHL</title>
        <meta name="description" content="VHL" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <Image
            src="/../images/logo.png"
            alt="VHL Logo"
            className={styles.vercelLogo}
            width={50}
            height={50}
          />
          <h1>Welcome!</h1>
        </span>
      </main>
    </>
  );
}

export default Home;