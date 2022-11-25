import sgMail from '@sendgrid/mail';
import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dataEnv } from '../config/env.config.js'
import { getUserRegister } from "../models/user.model.js";


const user_create = (req, res) => {
    sgMail.setApiKey(dataEnv.parsed.SENDGRID_API_KEY)
    const token = uuidv4();
    const email = req.body.email;

    const msg = {
        to: email,
        from: 'robert_edu89@hotmail.com',
        subject: `HACKCHIAPAS`,
        text: "REGISTRO EXITOSS",
        html: `<h3> Hola ${req.body.username} su registro fue exitoso, podra ver más información en esta url </h3>`,
    }

    sgMail
        .send(msg)
        .then((response) => {
            if (response[0].statusCode === 202) {
                getUserRegister.User.create({
                    username: req.body.username,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone_number: req.body.phone_number,

                }, { fields: ['username', 'last_name', 'email', 'phone_number'] })
                    .then(users => {
                        res.send(users)

                    })
                    .catch(err => {
                        res.status(400).send(err)
                    });
            }
        })
        .catch((error) => {
            console.error(error)
        });
};

const user_get_all = async (req, res) => {

    const datas = await getUserRegister.User.findAll({
        attributes: ['id','username', 'last_name', 'email', 'phone_number']
    });

    if (datas) {
        res.send(datas)
    } else {
        return res.status(400).json({ error: 'No hay datos' });
    }
};

const user_delete = async (req, res) => {

    await getUserRegister.User.destroy({
        where: { id: req.body.id }
    })
        .then(function (categoryDelete) {
            if (categoryDelete === 1) {
                res.send({ status: 'Dato eliminado' });
            } else {
                return res.status(400).json({ error: `Registro a eliminar, no encontrado` });
            }
        }, function (err) {
            console.log(err);
            return res.status(400).json({ error: err });
        });

};

const send_email = (req, res) => {

    // REALIZAR EL PROCESO PARA LA RECUPERACIÓN DEL CONTRASEÑA
    sgMail.setApiKey(dataEnv.parsed.SENDGRID_API_KEY)
    const token = uuidv4();
    const email = req.body.email;
    const msg = {
        to: req.body.email,
        from: 'robert_edu89@hotmail.com',
        subject: "Recuperar contraseña",
        text: "Recuperar contraseña",
        html: `<ul><li><a href=${dataEnv.parsed.HOST_URL_FRONT}/${token}>Website</a></li> </ul>`,
    }

    sgMail
        .send(msg)
        .then((response) => {
            if (response[0].statusCode === 202) {
                getUser.UserRecovery.create({
                    email,
                    token,
                }, { fields: ['email', 'token'] })
                    .then(data => {
                        res.send(data)
                    })
                    .catch(err => {
                        res.status(400).send(err)
                    });
            }
        })
        .catch((error) => {
            console.error(error)
        });

}


export const userController = { user_create, user_get_all, user_delete };