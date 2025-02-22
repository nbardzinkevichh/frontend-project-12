import { defaultNS } from "../i18n.ts";
import resources from './resources.ts';

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources;
  }
}