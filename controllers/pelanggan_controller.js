// controllers/pelanggan_controller.js
const {Pelanggan} = require('../models');
const sequelize = require('../config/config');

// Membuat pelanggan baru
exports.create_pelanggan = (req, res) => {
    const data = req.body;
    Pelanggan.create(data)
        .then(result => {
            res.status(201).json({
                "success": true,
                "code" : 201,
                "res" : {id: result.id },
                "message": "Sukses menambah data"})
        })
        .catch(err => {
            res.status(500).json({
                "success": false,
                "code" : 500,
                "res" : {message: err.message },
                "message": "Gagal menambah data"})
        });
};

// Mengambil semua pelanggan
exports.get_all_pelanggan = (req, res) => {
    Pelanggan.findAll()
        .then(results => {
            res.status(200).json({
                "success": true,
                "code" : 200,
                "res" : {results},
                "message": "Sukses menampilkan data"})
        })
        .catch(err => {
            res.status(500).json({
                "success": false,
                "code" : 500,
                "res" : {message: err.message },
                "message": "Gagal menampilkan data"})
        });
};

// Mengambil pelanggan berdasarkan ID
exports.get_pelanggan_by_id = (req, res) => {
    const id = req.params.id;
    Pelanggan.findByPk(id)
        .then(result => {
            if (result) {
                res.status(200).json({
                    "success": true,
                    "code" : 200,
                    "res" : {result},
                    "message": "Sukses menampilkan data"})
            } else {
                res.status(404).json({
                    "success": false,
                    "code" : 404,
                    "res" : {},
                    "message": "Gagal menampilkan data"})
            }
        })
        .catch(err => {
            res.status(500).json({
                "success": false,
                "code" : 500,
                "res" : {message: err.message},
                "message": "Gagal menampilkan data"})
        });
};

// Memperbarui pelanggan berdasarkan ID

exports.update_pelanggan = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const MAX_RETRIES = 3;
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
        attempt++;
        const t = await sequelize.transaction(); // Mulai transaksi

        try {
            const result = await Pelanggan.update(data, { where: { id: id }, transaction: t });

            if (result[0] === 0) {
                await t.rollback(); // Rollback transaksi jika tidak ada baris yang diperbarui
                return res.status(404).json({
                    "success": false,
                    "code" : 404,
                    "res" : {},
                    "message": "Pelanggan tidak ditemukan"});
            }

            await t.commit(); // Commit transaksi
            return res.status(200).json({
                "success": true,
                "code" : 200,
                "res" : { id: id },
                "message": "Pelanggan berhasil diperbarui"});
        } catch (err) {
            await t.rollback(); // Rollback transaksi jika terjadi error

            if (err.name === 'SequelizeTimeoutError' || (err.original && err.original.code === 'ER_LOCK_WAIT_TIMEOUT')) {
                // Retry jika mengalami timeout atau lock wait
                if (attempt < MAX_RETRIES) {
                    console.log(`Retrying transaction... attempt ${attempt}`);
                    continue;
                }
                return res.status(503).json({
                    "success": false,
                    "code" : 503,
                    "res" : {},
                    "message": "Timeout, please try again later"});
            }
            res.status(500).json({
                "success": false,
                "code" : 500,
                "res" : {message: err.message},
                "message": "Gagal mengupdate pelanggan"});
        }
    }
};

// Menghapus pelanggan berdasarkan ID
exports.delete_pelanggan = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Pelanggan.destroy({ where: { id: id } });
        if (deleted) {
            return res.status(200).json({
                "success": true,
                "code" : 200,
                "res" : {id: id },
                "message": "Data berhasil terhapus!"});
            
        }
        return res.status(404).json({
            "success": false,
            "code" : 404,
            "res" : {},
            "message": "Pelanggan tidak ditemukan"});
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "code" : 500,
            "res" : {message: error.message},
            "message": "Gagal mengupdate pelanggan"});
    }
};
