import express, { type Request, type Response } from 'express';

const router = express.Router();

router.post('/save_speedtest', (req: Request, res: Response) => {
  const measurementResult = req.body;
  console.log('Received data: ', measurementResult);

  res.status(200).json({ succes: true });
});

export default router;
