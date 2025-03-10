import { io, Socket } from "socket.io-client";
import { setMessage } from "../../feauters/Messages/messagesSlice.ts";
import { useAppDispatch } from "../../feauters/store.ts";
import { useEffect } from 'react';

import { Message } from "../../feauters/Messages/messagesSlice.ts";
import {
  Channel,
  deleteChannel,
  editChannelName, selectChannels,
  setActiveChannel,
  setChannel
} from "../../feauters/Channels/channelsSlice.ts";
import {useSelector} from "react-redux";

interface ServerToClientEvents {
  newMessage: (message: Message) => void;
  newChannel: (channel: Channel) => void;
  removeChannel: (channel: Channel) => void;
  renameChannel: (channel: Channel) => void;
};

type ClientToServerEvents = ServerToClientEvents;

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('/', { path: '/socket.io' });

export const useSocketsManager = () => {
  const dispatch = useAppDispatch();
  const firstChannel = useSelector(selectChannels)[0];

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on('newMessage', (message: Message) => {
      dispatch(setMessage({ message }));
    });

    socket.on('newChannel', (channel) => {
      dispatch(setChannel(channel));
    });

    socket.on('removeChannel', (channel) => {
      dispatch(deleteChannel(channel));
      dispatch(setActiveChannel(firstChannel));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(editChannelName(channel));
      dispatch(setActiveChannel(channel));
    });
    
    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.disconnect();
    }
  }, [dispatch])
};