import { getData } from '../config/connection.config.js';
import { DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';

const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/;

const User = getData.sequelizeClient.define('tbl_on_register', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese su nombre'
            }
        }
    },
    last_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese su apellido'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
        validate: {
            notNull: {
                msg: 'Ingrese su correo'
            }
        }
    },
    phone_number: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            validator: function (v) {
                return phoneValidationRegex.test(v);
            },
            notNull: {
                msg: 'Ingrese su número telefonico'
            }
        }
    },
    // password: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     validate: {
    //         notNull: {
    //             msg: 'Ingrese su contraseña'
    //         }
    //     }
    // },
}, {
    tableName: 'tbl_on_register',
    freezeTableName: true,
    // hooks: {
    //     beforeCreate: async (user, options) => {
    //         {
    //             const salt = bcryptjs.genSaltSync(10);
    //             user.password = user.password && user.password != "" ? bcryptjs.hashSync(user.password, salt) : "";
    //         }
    //     }
    // }
});

export const getUserRegister = { User }