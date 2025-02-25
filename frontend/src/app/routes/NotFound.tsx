import {useTranslation} from "react-i18next";
import Header from "../../components/Header.tsx";

export default function NotFound() {
  const { t } = useTranslation('pages');

  return (
    <>
      <Header status='loggedOut' />
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1>{t('notFound.notFoundError')}</h1>
        <p>{t('notFound.notFoundDescription')} <a href="/">{t('notFound.notFoundLink')}</a></p>
      </div>
    </>

  )
};
