import Head from "next/head";
import Image from "next/image";
import Header from "@/components/header";
import styles from "@/styles/Home.module.css";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>VHL</title>
        <meta name="description" content="VHL" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className={styles.main}>
      <section className={styles.content}>
          <Image
            src="/images/logo-vh.jpg"
            alt="VHL Logo"
            width={175}
            height={100}
          />
          <h1 className={styles.title}>Welcome!</h1>
          <div className={styles.text}>
            <p>Welkom bij VHL. We zijn een van de grootste jeugdclub in Vlaanderen. Hier is er plaats voor iedereen en willen we je helpen je talent voor volleybal te vinden.</p>
            <p>Naast jeugdploegen hebben we twee ploegen op het hoogste niveau van België. De Dames A en de Heren A. Word jij hun nieuwe grootste supporter? We verwelkomen je graag bij hun matchen.</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
