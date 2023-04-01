import { Server as SocketServer, type Socket } from 'socket.io';
import type { Server as HttpServer } from 'http';

const createSocketServer = (httpServer: HttpServer): SocketServer => {
  const io = new SocketServer(httpServer, {
    path: '/socket.io',
    cors: {
      origin: 'http://localhost:5173',
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('connected in server');
    socket.on('measure_latency', (start: number, upstreamData: ArrayBuffer, downstreamDataSize: number) => {
      const end = Date.now();
      const latency = end - start;
      const downstreamDataBuffer = new ArrayBuffer(downstreamDataSize);
      const downstreamData = new Uint8Array(downstreamDataBuffer);
      socket.emit('latency_result', latency, downstreamData.buffer);
    });
  });

  return io;
};

export { createSocketServer };
