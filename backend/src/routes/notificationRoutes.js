import express from 'express';
import notificationController from '../controllers/notificationController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(notificationController.createNotification)
                 .get(notificationController.getAllNotifications)

router.route('/:id').delete(notificationController.deleteNotification)
router.route('/user/:id').get(notificationController.getNotificationsByUserID)

export default router;
