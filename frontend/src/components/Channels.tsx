import { useGetChannelsQuery } from "./services/channelsApi";
import { useState } from "react";
import { RootState } from "./services/store";
import { Channel, setChannels } from "./services/channelsSlice";
import { setActiveChannel } from "./services/channelsSlice";
import { getActiveChannel } from "./services/channelsSlice";
import { selectChannels } from "./services/channelsSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./services/store";
import { useEffect } from "react";

export default function Channels() {
  const { data, error, isLoading, isSuccess } = useGetChannelsQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setChannels({ channels: data }));
      dispatch(setActiveChannel({ activeChannel: data[0]}))
    }
  }, [isSuccess, data, dispatch]);

  const channels = useSelector((state: RootState) => selectChannels(state));
  const activeChannel = useSelector((state: RootState) => getActiveChannel(state));
  const activeIndex = activeChannel?.id ?? 0;

  const handleChannelChange = (id: string) => {
    const channelToChange = channels.find((channel) => channel.id === id);
    
    dispatch(setActiveChannel({ activeChannel: channelToChange!}))
  };

  return (
    <ul className="p-0">
      { data && data.map((channel: Channel) => <li key={channel.id}>
        <button onClick={() => handleChannelChange(channel.id)}
        className={`w-100 p-0 rounded-0 text-start btn p-2 ${channel.id === activeIndex ? 'btn-secondary' : ''}`} type="button"># {channel.name}
        </button>
        </li>)}
    </ul> 
  )
}