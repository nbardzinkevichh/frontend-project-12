import { defaultNS } from "../i18n.ts";
import resources from './resources.ts';

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources;
  }
}

// console.log(typeof defaultNS);

// почему бы не заменить interface/type на просто объявление объекта к примеру и просто не приписать typeof?