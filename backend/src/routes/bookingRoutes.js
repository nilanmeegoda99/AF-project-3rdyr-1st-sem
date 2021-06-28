import express from 'express';
import bookingController from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(bookingController.createBooking)
                 .get(bookingController.getAllBookings)

router.route('/:id').delete(bookingController.deleteBooking)

export default router;
