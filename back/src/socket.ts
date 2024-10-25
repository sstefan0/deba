import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { randomBytes, randomUUID } from "crypto";
import { SerialPort } from "serialport";
import path from "path";
let io: Server | null = null;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:5173"],
      methods: ["GET", "POST"],
    },
  });
  const serialport = new SerialPort({ path: "COM6", baudRate: 9600 });
  io.on("connection", (socket) => {
    serialport.on("data", (data: any) => {
      socket.emit("temperature", data.toString());
    });
  });
};

export const getSocketIo = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }
  return io;
};
