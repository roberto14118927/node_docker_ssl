import { getData } from '../config/connection.config.js';
import { DataTypes } from 'sequelize';

const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/;

const Category = getData.sequelizeClient.define('tbl_on_category', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese categoria'
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese descripcion'
            }
        }
    },
}, {
    tableName: 'tbl_on_category',
    freezeTableName: true,
});


const Speaker = getData.sequelizeClient.define('tbl_on_speaker', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese descripcion'
            }
        }
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese su nombre'
            }
        }
    },
    specialist: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese su especialidad'
            }
        }
    },

    photo: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese su foto'
            }
        }
    },
}, {
    tableName: 'tbl_on_speaker',
    freezeTableName: true,
});

const Faq = getData.sequelizeClient.define('tbl_on_faq', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    question: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese pregunta'
            }
        }
    },
    response: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese respuesta'
            }
        }
    },
}, {
    tableName: 'tbl_on_faq',
    freezeTableName: true,
});

export const getAdmin = { Category, Speaker, Faq }