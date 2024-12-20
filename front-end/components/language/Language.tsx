import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Language: React.FC = () => {

  const { t } = useTranslation();

  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (event: { target: { value: string } }) => {
    const newLocale = event.target.value;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="flex items-center space-x-2">
      <label
        htmlFor="language"
        className="text-white font-medium tracking-wide"
      >
        {t("language.language")}
      </label>
      <select
        id="language"
        value={locale}
        onChange={handleLanguageChange}
        className="bg-black text-white border border-gray-700 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 hover:bg-gray-800 transition duration-200"
      >
        <option value="en" className="bg-black text-white">
          {t("language.english")}
        </option>
        <option value="zh" className="bg-black text-white">
          {t("language.zh")}
        </option>
      </select>
    </div>
  );
};

export default Language;
