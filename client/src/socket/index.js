import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const host = "127.0.0.1:5000";

function Socket() {
    const socketRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("connect socket")
        socketRef.current = socketIOClient(host);
        socketRef.current.on('newShare', data => {
            console.log("newShare", data)
            toast.info(`${data?.data?.user?.email} just shared a new video`, { onOpen: () => navigate('/'), closeOnClick: true })
        })
        return () => {
            socketRef.current.disconnect();
        };
    }, []);


    return (
        <></>
    );
}

export default Socket;