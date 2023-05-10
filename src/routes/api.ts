import express, { type Request, type Response, type NextFunction } from 'express';
import mongoose from 'mongoose';
import MeasurementResult from '../models/MeasurementResult';

const router = express.Router();
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://mongodb:27017/testdb';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(error => {
    console.error('MongoDB connection error: ', error);
  });

const saveSpeedtest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const measurementResult = req.body;
  console.log('Received data: ', measurementResult);
  const newMeasurement = new MeasurementResult(measurementResult);
  try {
    await newMeasurement.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving measurement result:', error);
    next(new Error('Error saving measurement result'));
  }
};

const getAllSpeedtests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allSpeedtests = await MeasurementResult.find();
    res.status(200).json(allSpeedtests);
  } catch (error) {
    console.error('Error retrieving all speedtests:', error);
    next(new Error('Error retrieving all speedtests'));
  }
};

router.post('/save_speedtest', (req, res, next) => {
  saveSpeedtest(req, res, next).catch(next);
});

router.get('/speedtest', (req, res, next) => {
  getAllSpeedtests(req, res, next).catch(next);
});

export default router;
