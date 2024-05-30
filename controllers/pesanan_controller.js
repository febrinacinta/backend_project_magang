// controllers/Pesanan_controller.js
const {Pesanan} = require('../models');
const sequelize = require('../config/config');

// Membuat Pesanan baru
exports.create_pesanan = (req, res) => {
    const data = req.body;
    Pesanan.create(data)
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

// Mengambil semua Pesanan
exports.get_all_pesanan = (req, res) => {
    Pesanan.findAll()
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

// Mengambil Pesanan berdasarkan ID
exports.get_pesanan_by_id = (req, res) => {
    const id = req.params.id;
    Pesanan.findByPk(id)
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

// Memperbarui Pesanan berdasarkan ID

exports.update_pesanan = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const MAX_RETRIES = 3;
    let attempt = 0;
    
    const result = await Pesanan.update(data, { where: { id: id }});

    if (result[0] === 0) {
        return res.status(404).json({
            "success": false,
            "code" : 404,
            "res" : {},
            "message": "Pesanan tidak ditemukan"});
    }
    return res.status(200).json({
        "success": true,
        "code" : 200,
        "res" : { id: id },
        "message": "Pesanan berhasil diperbarui"});
};

// Menghapus Pesanan berdasarkan ID
exports.delete_pesanan = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Pesanan.destroy({ where: { id: id } });
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
            "message": "Pesanan tidak ditemukan"});
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "code" : 500,
            "res" : {message: error.message},
            "message": "Gagal mengupdate Pesanan"});
    }
};
