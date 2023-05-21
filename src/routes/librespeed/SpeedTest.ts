/* eslint-disable @typescript-eslint/restrict-template-expressions */
import express, { type Request, type Response, type Router } from 'express';
import randomBytes from 'random-bytes';
import request from 'request';
import { calcDistance, type Coordinate } from './Helpers';

const Server: Router = express.Router();
let cache: Buffer;

Server.get('/empty', (req: Request, res: Response): void => {
  res.status(200).send('');
});

Server.post('/empty', (req: Request, res: Response): void => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.set('Cache-Control', 'post-check=0, pre-check=0');
  res.set('Pragma', 'no-cache');
  res.status(200).send('');
});

Server.get('/garbage', (req: Request, res: Response): void => {
  res.set('Content-Description', 'File Transfer');
  res.set('Content-Type', 'application/octet-stream');
  res.set('Content-Disposition', 'attachment; filename=random.dat');
  res.set('Content-Transfer-Encoding', 'binary');
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.set('Cache-Control', 'post-check=0, pre-check=0');
  res.set('Pragma', 'no-cache');
  const requestedSize: number = Number(req.query.ckSize) ?? 100;

  const send = (): void => {
    for (let i = 0; i < requestedSize; i++) res.write(cache);
    res.end();
  };

  if (cache !== undefined) {
    send();
  } else {
    randomBytes(1048576, (error: Error | null, bytes: Buffer): void => {
      if (error != null) {
        console.error(error);
        res.status(500).send('Internal server error');
        return;
      }
      cache = bytes;
      send();
    });
  }
});
const X_FORWARDED_FOR = 'x-forwarded-for';
const X_REAL_IP = 'X-Real-IP';
const HTTP_CLIENT_IP = 'HTTP_CLIENT_IP';
const HTTP_X_FORWARDED_FOR = 'HTTP_X_FORWARDED_FOR';

Server.get('/getIP', function (req, res) {
  let requestIP: string | undefined;

  if (typeof req.headers[X_FORWARDED_FOR] === 'string') {
    requestIP = req.headers[X_FORWARDED_FOR].toString();
  } else if (req.connection.remoteAddress != null) {
    requestIP = req.connection.remoteAddress;
  } else if (req.socket.remoteAddress != null) {
    requestIP = req.socket.remoteAddress;
  } else if (typeof req.headers[X_REAL_IP] === 'string') {
    requestIP = req.headers[X_REAL_IP].toString();
  } else if (typeof req.headers[HTTP_CLIENT_IP] === 'string') {
    requestIP = req.headers[HTTP_CLIENT_IP].toString();
  } else if (typeof req.headers[HTTP_X_FORWARDED_FOR] === 'string') {
    requestIP = req.headers[HTTP_X_FORWARDED_FOR].toString();
  }
  if (requestIP !== undefined) {
    if (requestIP.startsWith('::ffff:')) {
      requestIP = requestIP.substring(7);
    }

    request('https://ipinfo.io/' + requestIP + '/json', function (err, _, ipData) {
      if (err !== undefined) {
        res.send(requestIP);
        return;
      }

      const ipInfo = JSON.parse(ipData.body);

      request('https://ipinfo.io/json', function (err, _, serverData) {
        if (err !== undefined) {
          res.send(`${requestIP} - ${ipInfo.org}, ${ipInfo.country}`);
          return;
        }

        const serverInfo = JSON.parse(serverData.body);
        const ipLoc: Coordinate = ipInfo.loc.split(',').slice(0, 2) as Coordinate;
        const serverLoc: Coordinate = serverInfo.loc.split(',').slice(0, 2) as Coordinate;

        if (ipLoc !== undefined && serverLoc !== undefined) {
          const d = calcDistance(ipLoc, serverLoc);
          res.send(`${requestIP} - ${ipInfo.org}, ${ipInfo.country} (${d}km)`);
        } else {
          res.send(`${requestIP} - ${ipInfo.org}, ${ipInfo.country}`);
        }
      });
    });
  } else {
    // requestIP가 undefined일 때의 처리 로직을 추가합니다.
    // 예: res.send("Could not determine IP address.");
    console.log(' request IP is undefined!!!!!!!');
  }
});

export default Server;
