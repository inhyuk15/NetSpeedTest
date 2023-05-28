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
  const { dlStatus, ulStatus, pingStatus, jitterStatus, clientIp, floorNumber, roomNumber, locationClass, userCookie } =
    req.body;
  // const measurementResult = req.body;

  const measurementResult = {
    dlStatus,
    ulStatus,
    pingStatus,
    jitterStatus,
    clientIp,
    floorNumber,
    roomNumber,
    locationClass,
    userCookie,
  };

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

const getSpeedtestsByDay = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { day } = req.query;
  const dayAsNumber = Number(day);

  const data = await MeasurementResult.aggregate([
    {
      $project: {
        dayOfWeek: { $dayOfWeek: '$createdAt' },
        document: '$$ROOT',
      },
    },
    {
      $match: {
        dayOfWeek: dayAsNumber,
      },
    },
    {
      $group: {
        _id: '$dayOfWeek',
        count: { $sum: 1 },
        documents: { $push: '$document' },
      },
    },
  ]);

  res.status(200).json(data);
};

router.post('/save_speedtest', (req, res, next) => {
  saveSpeedtest(req, res, next).catch(next);
});

router.get('/speedtest', (req, res, next) => {
  getAllSpeedtests(req, res, next).catch(next);
});

// ex) Sunday: speedtest_by_day?day=1, Tuesday: speedtest_by_day?day=3
router.get('/speedtest_by_day', (req, res, next) => {
  getSpeedtestsByDay(req, res, next).catch(next);
});

export default router;
