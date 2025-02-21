import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import resources from "./@types/resources.ts";

export const defaultNS = "common";

i18n.use(initReactI18next).init({
  lng: "ru",
  ns: ["pages", "forms", "common", "toasts"],
  defaultNS,
  resources: {
    ru: resources,
  },
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

// Тексты интерфейсов:
//   Неверные имя пользователя или пароль
//
//   Пароли должны совпадать, Отправить, Ошибка соединения, +, Имя канала, Управление каналом


export default i18n;