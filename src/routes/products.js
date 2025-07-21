import { Router } from 'express';
import * as ctrl from '../controllers/productsController.js';

const router = Router();

router.post('/bulk-load',   ctrl.bulkCreate);
router.put('/bulk-update',  ctrl.bulkUpdate);

router.get('/parallel',     ctrl.parallel);

router.get('/',             ctrl.getAll);
router.get('/:id',          ctrl.getById);
router.post('/',            ctrl.createProduct);
router.put('/:id',          ctrl.updateProduct);
router.delete('/:id',       ctrl.deleteProduct);


export default router;
