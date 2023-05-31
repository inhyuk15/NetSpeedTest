import express, { type Request, type Response, type NextFunction } from 'express';
import mongoose from 'mongoose';
import MeasurementResult from '../models/MeasurementResult';
import User from '../models/User';
import SpeedTest from '../models/SpeedTest';
import moment from 'moment';

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

  const speedTest = new SpeedTest({
    dlStatus,
    ulStatus,
    pingStatus,
    jitterStatus,
    clientIp,
  });

  const user = new User({
    floorNumber,
    roomNumber,
    locationClass,
    userCookie,
  });

  try {
    await speedTest.save();
    await user.save();

    const newMeasurement = new MeasurementResult({
      user,
      speedTest,
    });
    await newMeasurement.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving measurement result:', error);
    next(new Error('Error saving measurement result'));
  }
};

const getAllSpeedtests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allSpeedtests = await MeasurementResult.find().populate('user speedTest');
    res.status(200).json(allSpeedtests);
  } catch (error) {
    console.error('Error retrieving all speedtests:', error);
    next(new Error('Error retrieving all speedtests'));
  }
};
const getSpeedtestsByDay = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { day } = req.query;
    const dayAsNumber = Number(day);
    const startOfDay = moment().day(dayAsNumber).startOf('day').toDate();
    const endOfDay = moment().day(dayAsNumber).endOf('day').toDate();

    const data = await MeasurementResult.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).populate('user speedTest');

    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving speedtests by day:', error);
    next(new Error('Error retrieving speedtests by day'));
  }
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
