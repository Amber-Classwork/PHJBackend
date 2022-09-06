const AWS = require("aws-sdk");
const fs = require("fs");
const multer = require("multer");
const multerS3 = require("multer-s3");





// create a new instance of s3 bucket

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey
})


// uploads file to s3 server
const uploadFileToS3 = multer({
    storage: multerS3({
        s3,
        bucket:bucketName,
        metadata: (req, file, cb)=>{
            cb(null, {fieldName: file.fieldname})
        },
        key:(req, file, cb)=>{
            cb(null, Date.now().toString() + '-' + file.originalname);
        }

    })
})


// function deleteFileFromS3 = 


module.exports = {
    uploadFileToS3,
}


// downloads a file from s3