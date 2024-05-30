module.exports = (sequelize, DataTypes) =>{const Pesanan=sequelize.define('Pesanan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama_barang: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    harga: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    tanggal_pesan: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'pesanan',
    timestamps: false
});

return Pesanan

}
// module.exports = Pesanan;
