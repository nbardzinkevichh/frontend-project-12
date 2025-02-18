import {useTranslation} from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation('pages');

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>{t('notFound.notFoundError')}</h1>
      <p>{t('notFound.notFoundDescription')} <a href="/">{t('notFound.notFoundLink')}</a></p>
    </div>
  )
};