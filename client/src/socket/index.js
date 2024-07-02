import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const host = "66.42.59.88:6969:6969";

function Socket() {
  const socketRef = useRef();

  useEffect(() => {
    console.log("connect socket")
    socketRef.current = socketIOClient(host);
    return () => {
        socketRef.current.disconnect();
      };
  }, []);


  return (
      <></>
  );
}

export default Socket;