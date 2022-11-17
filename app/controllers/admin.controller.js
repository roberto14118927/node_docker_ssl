import AWS from 'aws-sdk';

import { getAdmin } from "../models/admin.model.js";
import { awsKeys } from '../config/config.js';


const s3 = new AWS.S3({
    accessKeyId: awsKeys.accessKeyId,
    secretAccessKey: awsKeys.secretAccessKey
});

const category_create = (req, res) => {
    getAdmin.Category.create({
        category: req.body.category,
        description: req.body.description,

    }, { fields: ['id', 'category', 'description'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            res.status(400).send(err)
        });
};

const category_get_all = async (req, res) => {

    const datas = await getAdmin.Category.findAll({
        attributes: ['id', 'category', 'description']
    });

    if (datas) {
        res.send(datas)
    } else {
        return res.status(400).json({ error: 'No hay categorias' });
    }
};

const category_delete = async (req, res) => {

    await getAdmin.Category.destroy({
        where: { id: req.body.id }
    })
        .then(function (categoryDelete) {
            if (categoryDelete === 1) {
                res.send({ status: 'Categoria eliminada' });
            } else {
                return res.status(400).json({ error: `Categoria a eliminar, no encontrado` });
            }
        }, function (err) {
            console.log(err);
            return res.status(400).json({ error: err });
        });

};

// SPEAKERS -------------------------------------------

const speaker_create = (req, res) => {

    const params = {
        Bucket: awsKeys.awsBucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        // ACL: "public-read-write",             
        ContentType: "image/png"
    };

    s3.upload(params, (error, data) => {

        if (error) {
            res.status(500).send({ "err": error })
        }

        getAdmin.Speaker.create({
            description: req.body.description,
            username: req.body.username,
            specialist: req.body.specialist,
            photo: data.Location,
        }, { fields: ['id', 'description', 'username', 'specialist', 'photo'] })
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    });
};

const speaker_get_all = async (req, res) => {

    const datas = await getAdmin.Speaker.findAll({
        attributes: ['id', 'description', 'username', 'specialist', 'photo']
    });

    if (datas) {
        res.send(datas)
    } else {
        return res.status(400).json({ error: 'No hay datos' });
    }
};

const speaker_delete = async (req, res) => {

    await getAdmin.Speaker.destroy({
        where: { id: req.body.id }
    })
        .then(function (dataDelete) {
            if (dataDelete === 1) {
                res.send({ status: 'dato eliminado' });
            } else {
                return res.status(400).json({ error: `Datos no encontrado` });
            }
        }, function (err) {
            console.log(err);
            return res.status(400).json({ error: err });
        });

};

// FAQS -------------------------------------------

const faq_create = (req, res) => {
    getAdmin.Faq.create({
        question: req.body.question,
        response: req.body.response,

    }, { fields: ['id', 'question', 'response'] })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(400).send(err)
        });
};

const faq_get_all = async (req, res) => {

    const datas = await getAdmin.Faq.findAll({
        attributes: ['id', 'question', 'response']
    });

    if (datas) {
        res.send(datas)
    } else {
        return res.status(400).json({ error: 'No hay datos' });
    }
};

const faq_delete = async (req, res) => {

    await getAdmin.Faq.destroy({
        where: { id: req.body.id }
    })
        .then(function (dataDelete) {
            if (dataDelete === 1) {
                res.send({ status: 'dato eliminado' });
            } else {
                return res.status(400).json({ error: `Datos no encontrado` });
            }
        }, function (err) {
            console.log(err);
            return res.status(400).json({ error: err });
        });

};


export const dataController = { category_create, category_get_all, category_delete, speaker_create, speaker_get_all, speaker_delete, faq_create, faq_get_all, faq_delete };