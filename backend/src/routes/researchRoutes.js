import express from 'express';
import researchController from '../controllers/researchController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(researchController.createResearch)
                 .get(researchController.getAllResearches)

router.route('/:id').get(researchController.getResearchByID)
                    .put(researchController.updateResearchDetails)
                    .delete(researchController.deleteResearchDetails)

router.route('/approve/:id').put(researchController.approveResearch)
router.route('/user/:id').get(researchController.getAllResearchesByUser)
router.route('/complete/:id').put(researchController.completeResearch)
router.route('/paid/:id').put(researchController.completePayment)
router.route('/public/:id').get(researchController.getResearchesForPublic)

export default router;