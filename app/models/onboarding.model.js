import { getData } from '../config/connection.config.js';
import { DataTypes } from 'sequelize';

const OnBoarding = getData.sequelizeClient.define('tbl_on_boarding', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese titulo'
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese el texto'
            }
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'url imagen'
            }
        }
    },
}, {
    tableName: 'tbl_on_boarding',
    freezeTableName: true,
});

export const getOnBoarding = {OnBoarding}