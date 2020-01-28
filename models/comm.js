module.exports = (sequelize, DataTypes) => {
    const Comm = sequelize.define('comm', {
        form: {
            type: DataTypes.STRING,
            allowNull: false
        },
        schedule: {
            type: DataTypes.STRING,
            allowNull: false
        },
        line: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })
    return Comm;
}