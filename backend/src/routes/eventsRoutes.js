import express from 'express';
import eventController from '../controllers/eventController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(eventController.createEvent)
                 .get(eventController.getAllEvents)

router.route('/:id').get(eventController.getEventByID)
                    .put(eventController.updateEventDetails)
                    .delete(eventController.deleteEventDetails)

router.route('/approve/:id').put(eventController.approveEvent)

router.route('/conference/:id').get(eventController.getEventsByConference)

export default router;