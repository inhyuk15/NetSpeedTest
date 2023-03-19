// const express = require('express');
import express, { type Request, type Response } from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function (req: Request, res: Response) {
  res.send('respond with a resource');
});

// module.exports = router;
export default router;
