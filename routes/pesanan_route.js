// routes/pesanan_route.js
const express = require('express');
const router = express.Router();
const pesananController = require('../controllers/pesanan_controller');

router.post('/pesanan', pesananController.create_pesanan);
router.get('/pesanan', pesananController.get_all_pesanan);
router.get('/pesanan/:id', pesananController.get_pesanan_by_id);
router.put('/pesanan/:id', pesananController.update_pesanan);
router.delete('/pesanan/:id', pesananController.delete_pesanan);

module.exports = router;
