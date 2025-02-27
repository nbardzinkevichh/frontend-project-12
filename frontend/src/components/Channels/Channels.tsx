import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../feauters/store.ts";

import { useGetChannelsQuery } from "../../feauters/Channels/channelsApi.ts";

import { Channel, setChannels } from "../../feauters/Channels/channelsSlice.ts";
import { setActiveChannel, getActiveChannel, selectChannels } from "../../feauters/Channels/channelsSlice.ts";
import ChannelModal from "./ChannelModal.tsx";
import {ButtonGroup, Dropdown} from "react-bootstrap";
import {useTranslation} from "react-i18next";

import useErrorHandler from "../../hooks/useErrorHandler.ts";

export default function Channels() {
  const [show, setShow] = useState(false);
  const [existingChannel, setExistingChannel] = useState<{id: string; name: string}>({id: '', name: ''});
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'remove'>('add');
  const { data, error, isSuccess } = useGetChannelsQuery();

  const errorHandler = useErrorHandler();

  const { t } = useTranslation('toasts');
  const { t: tDropdowns} = useTranslation();

  const handleModalShow = () => setShow(true);
  const handleModalClose = () => {
    setModalMode('add');
    setShow(false);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setChannels({ channels: data }));
      dispatch(setActiveChannel(data[0]));
    }
    if (error) {
      errorHandler(error, t('dataLoadingError'));
    }
  }, [data]);


  const handleChannelChange = (id: string) => {
    const channelToChange = channels.find((channel) => channel.id === id);
    dispatch(setActiveChannel(channelToChange!))
  };

  const handleChannelDelete = (id: string, name: string): void => {
    setExistingChannel({ id, name });
    setModalMode('remove');
    handleModalShow();
  };

  const handleChannelNameEdit = (id: string, name: string): void => {
    setExistingChannel({ id, name });
    setModalMode('edit');
    handleModalShow();
  };

  const sharedButtonClasses = "w-100 rounded-0 text-start";

  const channels = useSelector(selectChannels);
  const activeChannel = useSelector(getActiveChannel);
  const activeIndex = activeChannel?.id ?? 0;

  return (
    <>
      <div className="d-flex justify-content-between border-bottom p-4">
        <b>Каналы</b>
        <div className="modalButton">
          <button
          className="p-0 text-primary btn btn-group-vertical border-0"
          onClick={handleModalShow}
          type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z">
              </path>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4">
              </path>
            </svg>
            <span className="visually-hidden">+</span>
          </button>
          <ChannelModal
            mode={modalMode}
            setModalMode={setModalMode}
            show={show}
            handleModalClose={handleModalClose}
            existingChannel={existingChannel}
          />
        </div>

      </div>
      <div className="channels-title ">
        <ul className="p-0">
          { channels.map((channel: Channel) =>
              !channel.removable &&
              <li key={channel.id}>
                <button
                onClick={() => handleChannelChange(channel.id)}
                className={`${sharedButtonClasses} text-truncate btn ${channel.id === activeIndex ? 'btn-secondary' : ''}`} type="button">
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
              </li>
            )
          }
          {
            channels.map((channel: Channel) =>
            channel.removable &&
            <li key={channel.id}>
              <Dropdown as={ButtonGroup} className="d-flex">
                <button
                onClick={() => handleChannelChange(channel.id)}
                className={`${sharedButtonClasses} text-truncate btn ${channel.id === activeIndex ? 'btn-secondary' : ''}`}>
                  <span className="me-1">#</span>{channel.name}
                </button>

                <Dropdown.Toggle split className={`${channel.id === activeIndex ? 'btn-secondary' : ''}`} variant=""
                                 id="dropdown-split-basic">
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="" onClick={
                    () => handleChannelDelete(channel.id, channel.name)}>{tDropdowns('remove')}</Dropdown.Item>
                  <Dropdown.Item href="" onClick={
                    () => handleChannelNameEdit(channel.id, channel.name)}>{tDropdowns('rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            )
          }
        </ul>
      </div>
    </>
  )
}
