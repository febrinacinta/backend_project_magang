// routes/pelanggan_route.js
const express = require('express');
const router = express.Router();
const pelangganController = require('../controllers/pelanggan_controller');

router.post('/pelanggan', pelangganController.create_pelanggan);
router.get('/pelanggan', pelangganController.get_all_pelanggan);
router.put('/pelanggan/:id', pelangganController.update_pelanggan);
router.get('/pelanggan/:id', pelangganController.get_pelanggan_by_id);
router.delete('/pelanggan/:id', pelangganController.delete_pelanggan);

module.exports = router;
