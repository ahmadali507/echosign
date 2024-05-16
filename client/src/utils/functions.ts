/* eslint-disable @typescript-eslint/no-explicit-any */
import { SOCKET_URL } from "@/constants";
import { User } from "@/interfaces";
import { io } from "socket.io-client";
import { formatDistanceToNow } from 'date-fns';

export const extractDateTimeFromTimestamp = (timestamp: Date) => {

    if (!timestamp) return { date: '', time: '' }
    const date = new Date(timestamp)


    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });

    return { time: formattedTime };
};
export const getRelativeTime = (date: Date) => {
    if (!date) return ''
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};


export const connectToSocketIO = (setIsConnectedToSocket: any, loggedUser: User, setLiveUsers: any, setArrivalMessage: any) => {
    const serverURL = SOCKET_URL;
    const socket = io(serverURL);
    socket.on("connect", () => {
        setIsConnectedToSocket(true);
        socket.emit('addUser', { userId: loggedUser?._id, socketId: socket.id, email: loggedUser?.email });
        socket.on('getUsers', (lUsers) => { setLiveUsers(lUsers) })
        socket.on('getMessage', (message) => { setArrivalMessage(message) })
        console.log("Connected to the server");
    })
    socket.on("disconnect", () => {
        setIsConnectedToSocket(false);
        console.log("Disconnected from the server");
    })
};

export const disconnectToSocketIO = (setIsConnectedToSocket: any) => {
    const serverURL = SOCKET_URL;
    const socket = io(serverURL);
    setIsConnectedToSocket(false);
    socket.disconnect();
};
