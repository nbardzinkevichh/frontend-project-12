import { io, Socket } from "socket.io-client";
import { setMessage } from "../components/services/messagesSlice";
import { useAppDispatch } from "../components/services/store";
import { useEffect } from 'react';

import { Message } from "../components/services/messagesSlice";

interface ServerToClientEvents {
  newMessage: (message: Message) => void;
}

interface ClientToServerEvents {
  newMessage: (message: Message) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('/', { path: '/socket.io', autoConnect: false });

export const useSocketsManager = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on('newMessage', (message: Message) => {
      console.log('Received WebSocket message:', message);
      dispatch(setMessage({ message }));
    });
    
    return () => {
      socket.off('newMessage');
      socket.disconnect();
    }
  }, [dispatch])
};