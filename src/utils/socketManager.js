import { io } from "socket.io-client";
import app_env from "../utils/index";

let socket;

export const initializeSocket = (onConnect, onError, onReconnect, onReplay) => {
  socket = io(app_env.socket_domain);

  socket.io.on("error", onError);

  socket.io.on("ping", () => {
    console.log("ping");
  });

  socket.io.on("reconnect", onReconnect);

  socket.io.on("reconnect_attempt", onReconnect);

  socket.io.on("reconnect_error", onError);

  socket.io.on("reconnect_failed", () => {
    console.log("reconnect_failed");
  });

  socket.on("connect", () => {
    onConnect(socket);
    console.log("connected socket client");
  });

  socket.on("replay", onReplay);
};

export const getSocket = () => socket;
