import express from 'express';
import apiCtrl from '../controllers/apiController';

const router = express.Router();

router.get('/test', apiCtrl.test);

export default router;
