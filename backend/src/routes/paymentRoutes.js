import express from 'express';
import paymentController from '../controllers/paymentController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(paymentController.createPayment)

router.route('/:id').get(paymentController.getPaymentById)


export default router;
