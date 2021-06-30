import express from 'express';
import bookingController from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/user/:id').get(bookingController.getAllBookingsByUserId)
router.route('/').post(bookingController.createBooking)
                .get(bookingController.getAllBookings)

router.route('/:id').get(bookingController.getBookingById)
router.route('/:id').delete(bookingController.deleteBooking)
router.route('/paid/:id').put(bookingController.setPaidDetails)


export default router;
