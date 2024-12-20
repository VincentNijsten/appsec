import Head from "next/head";
import Image from "next/image";
import Header from "@/components/header";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Home: React.FC = () => {
  // Translation
  const { t } = useTranslation("common");

  // Predefined Users
  const predefinedUsers = [
    { email: "user1@email", password: "user1", role: "player" },
    { email: "user2@email", password: "user2", role: "coach" },
    { email: "user3@email", password: "user3", role: "admin" },
  ];

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="description" content="VHL" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="flex flex-col items-center bg-gray-50 min-h-screen py-10">
        <section className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-3/4 lg:w-2/3">
          <Image
            src="/images/logo-vh.jpg"
            alt="VHL Logo"
            width={175}
            height={100}
          />
          <h1 className="text-3xl font-bold text-gray-800 mt-6">
            {t("main.welcome")}
          </h1>
          <div className="mt-4 text-gray-600 text-center">
            <p className="mb-4">{t("main.tekst1")}</p>
            <p>{t("main.tekst2")}</p>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto mt-10 w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              {t("main.users")}
            </h2>
            <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-left">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2 uppercase">{t("main.email")}</th>
                  <th className="px-4 py-2 uppercase">{t("main.password")}</th>
                  <th className="px-4 py-2 uppercase">{t("main.role")}</th>
                </tr>
              </thead>
              <tbody>
                {predefinedUsers.map((user, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {user.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.password}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 capitalize">
                      {user.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Home;
