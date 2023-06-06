import express from 'express';
import { createDummys } from '../utils/createDummys';
import { deleteAllData } from '../utils/deleteAllData';

const router = express.Router();

router.post('/create-dummys', (req, res) => {
  createDummys().catch(e => {
    console.error(e);
  });
  res.send('Dummy data created');
});

router.post('/delete-all-data', (req, res) => {
  deleteAllData().catch(e => {
    console.error(e);
  });
  res.send('Dummy data created');
});

export default router;
