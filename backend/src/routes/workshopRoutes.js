import express from 'express';
import workshopController from '../controllers/workshopController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(workshopController.createWorkshop)
                 .get(workshopController.getAllWorkshops)

router.route('/:id').get(workshopController.getWorkshopByID)
                    .put(workshopController.updateWorkshopDetails)
                    .delete(workshopController.deleteWorkshopDetails)

router.route('/approve/:id').put(workshopController.approveWorkshop)
router.route('/user/:id').get(workshopController.getAllWorkshopsByUser)
router.route('/public/:id').get(workshopController.getWorkshopsForPublic)

export default router;