module.exports = (sequelize, DataTypes) =>{ const Pelanggan=sequelize.define('Pelanggan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    alamat: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    telepon: {
        type: DataTypes.STRING(15),
        allowNull: false
    }
}, {
    tableName: 'pelanggan',
    timestamps: false
});

return Pelanggan

}
// module.exports = Pelanggan;
