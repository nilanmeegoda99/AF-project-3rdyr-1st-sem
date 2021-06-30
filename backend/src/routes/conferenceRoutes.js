import express from 'express';
import conferenceController from '../controllers/conferenceController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/active').get(conferenceController.getActiveConference)

router.route('/').post(conferenceController.createConference)
                 .get(conferenceController.getAllConferences)

router.route('/:id').get(conferenceController.getConferenceByID)
                    .put(conferenceController.updateConferenceDetails)
                    .delete(conferenceController.deleteConferenceDetails)

router.route('/active/:id').put(conferenceController.activeConference)

export default router;