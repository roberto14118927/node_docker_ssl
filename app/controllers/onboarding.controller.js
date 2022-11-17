import AWS from 'aws-sdk';

import { getOnBoarding } from "../models/onboarding.model.js";
import { awsKeys } from '../config/config.js';

const s3 = new AWS.S3({
    accessKeyId: awsKeys.accessKeyId,
    secretAccessKey: awsKeys.secretAccessKey
});

const boarding_create = (req, res) => {
    
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

        getOnBoarding.OnBoarding.create({
            title: req.body.title,
            description: req.body.description,
            url: data.Location
        }, { fields: ['title', 'description', 'url'] })
            .then(boarding => {
                res.status(200).send(boarding);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    });

};

const boarding_get_all = async (req, res) => {
    const boarding = await getOnBoarding.OnBoarding.findAll();
    if (boarding) {
        res.status(200).send(boarding);
    }
    else {
        return res.status(400).json({ error: 'Not data' });
    }
};



export const onBoardingController = { boarding_create, boarding_get_all }