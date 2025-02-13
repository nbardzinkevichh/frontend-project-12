import * as Yup from 'yup';

import { Channel } from './channelsSlice';

export const channelFieldValidation = (channelNames: Channel[]): Yup.Schema<{ name: string}> => {
  return Yup.object().shape({
    name: Yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .test('isNameExists', 'Должно быть уникальным', (value) => {
        return !channelNames.some((channel) => channel.name === value)
      })
  })
};