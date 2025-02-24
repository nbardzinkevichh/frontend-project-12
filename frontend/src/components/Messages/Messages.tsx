import { RootState, useAppDispatch } from "../../feauters/store.ts";
import { useSelector } from "react-redux";
import { useGetMessagesQuery, useSendMessageMutation } from "../../feauters/Messages/messagesApi.ts";
import { getActiveChannel } from "../../feauters/Channels/channelsSlice.ts";

import { useSocketsManager } from "../../lib/sockets/socketsManager.ts";

import { selectMessages } from "../../feauters/Messages/messagesSlice.ts";

import { useEffect, useState } from "react";
import { setMessages } from "../../feauters/Messages/messagesSlice.ts";

import leoProfanityFilter from '../../utility/leoProfanityFilter.ts';

import useErrorHandler from '../../hooks/useErrorHandler.ts';
import {useTranslation} from "react-i18next";

const filter = leoProfanityFilter();

export default function Messages() {
  useSocketsManager();

  const [inputMessage, setInputMessage] = useState('');

  const [sendMessage] = useSendMessageMutation();
  const { data, isSuccess, error } = useGetMessagesQuery();
  const messages = useSelector(selectMessages);

  const { t } = useTranslation('toasts');
  const errorHandler = useErrorHandler();

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setMessages({ messages: data }));
    }
    if (error) {
      errorHandler(error, t('dataLoadingError'));
    }
  }, [isSuccess, data, dispatch]);

  const activeChannel = useSelector((state: RootState) => getActiveChannel(state));
  const activeIndex = activeChannel?.id ?? 0;
  const activeMessages = messages?.filter((message) => message.channelId === activeIndex) || [];

  const handleInputMessageChange =
    (e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault();
    const username: string = localStorage.getItem("username")!;
    const filteredMessage = filter.clean(inputMessage);
    sendMessage({ message: filteredMessage, channelId: activeIndex,  username });
    setInputMessage('');
  };

  return (
    <div className="d-flex flex-column bg-white h-100">
      <div className="py-1 px-3 mb-4 bg-light shadow-sm">
        <b className=""># {activeChannel?.name}</b>
        <p className="">{activeMessages.length} сообщений</p>
      </div>
      
      <div className="message-box px-5 overflow-auto">
        { isSuccess && activeMessages.map(
          (msg) => <div key={msg.id} className="text-break mb-2">
            <b>{msg.username}: </b>{msg.body}
          </div>
        )}
      </div>

      <div className="mt-auto px-5 py-3">
        <form className="border rounded" action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" className="form-control py-2 border-0" placeholder="Введите сообщение..." value={inputMessage} onChange={handleInputMessageChange} aria-label="Новое сообщение" aria-describedby="basic-addon1" />
            <button className="btn btn-group-vertical send-button border-0" type="submit" disabled={inputMessage.length > 0 ? false : true}>
              <svg className="send-svg" width="20px" height="20px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M18.455 9.8834L7.063 4.1434C6.76535 3.96928 6.40109 3.95274 6.08888 4.09916C5.77667 4.24558 5.55647 4.53621 5.5 4.8764C5.5039 4.98942 5.53114 5.10041 5.58 5.2024L7.749 10.4424C7.85786 10.7903 7.91711 11.1519 7.925 11.5164C7.91714 11.8809 7.85789 12.2425 7.749 12.5904L5.58 17.8304C5.53114 17.9324 5.5039 18.0434 5.5 18.1564C5.55687 18.4961 5.77703 18.7862 6.0889 18.9323C6.40078 19.0785 6.76456 19.062 7.062 18.8884L18.455 13.1484C19.0903 12.8533 19.4967 12.2164 19.4967 11.5159C19.4967 10.8154 19.0903 10.1785 18.455 9.8834V9.8834Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
      
    </div>
  )
}