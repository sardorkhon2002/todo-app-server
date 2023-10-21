import bodyParser from "body-parser";
import cors from "cors";
import express, { Application, Response } from "express";
import * as http from "http";
import { Server, Socket } from "socket.io";
import * as process from "process";

export const app: Application = express();
const port: string = process.env.PORT || "8080";

const server: http.Server = http.createServer(app);
export const io: Server = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/healthz", (req, res) => {
  res.send("ok");
});

server.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
