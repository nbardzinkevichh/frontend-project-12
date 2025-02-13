import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../app/store";
import { RootState } from "../../app/store";

import { useGetChannelsQuery } from "./channelsApi";

import { Channel, setChannels } from "./channelsSlice";
import { setActiveChannel } from "./channelsSlice";
import { getActiveChannel } from "./channelsSlice";
import { selectChannels } from "./channelsSlice";
import AddChannelModal from "./AddChannelModal";
import { Button, ButtonGroup, Dropdown, SplitButton } from "react-bootstrap";

export default function Channels() {
  // localStorage.clear();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data, error, isLoading, isSuccess } = useGetChannelsQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setChannels({ channels: data }));
      dispatch(setActiveChannel(data[0]))
    }
  }, [isSuccess, data, dispatch]);

  const channels = useSelector((state: RootState) => selectChannels(state));
  const activeChannel = useSelector((state: RootState) => getActiveChannel(state));
  const activeIndex = activeChannel?.id ?? 0;

  const handleChannelChange = (id: string) => {
    const channelToChange = channels.find((channel) => channel.id === id);
    
    dispatch(setActiveChannel(channelToChange!))
  };

  const sharedButtonClasses = "w-100 p-0 rounded-0 text-start btn p-2";

  return (
    <>
      <div className="d-flex justify-content-between border-bottom p-4">
        <b>Каналы</b>
        <div className="modalButton">
          <button 
          className="p-0 text-primary btn btn-group-vertical border-0" 
          onClick={handleShow}
          type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4">
              </path>
            </svg>
          </button>
          <AddChannelModal show={show} handleClose={handleClose} />
        </div>
        
      </div>
      <div className="channels-title ">
        <ul className="p-0">
          { data && channels.map((channel: Channel) => 
              !channel.removable && 
              <li key={channel.id}>
                <button 
                onClick={() => handleChannelChange(channel.id)}
                className={`${sharedButtonClasses} ${channel.id === activeIndex ? 'btn-secondary' : ''}`} type="button"># {channel.name}
                </button>
              </li>
            )      
          }
          {
            data && channels.map((channel: Channel) => 
              channel.removable &&
              <li key={channel.id}>
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Button
                  onClick={() => handleChannelChange(channel.id)}
                  variant=""
                  className={`${sharedButtonClasses} ${channel.id === activeIndex ? 'btn-secondary' : ''}`}># {channel.name}</Button>

                  <Dropdown.Toggle split className={`${channel.id === activeIndex ? 'btn-secondary' : ''}`} variant="" id="dropdown-split-basic" />

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
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