const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const path = require("path");
const fs = require("fs")
const dotenv = require("dotenv");
dotenv.config();

const s3client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    },
});

async function getObjectURL(key) {
    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET,
        Key: key
    });
    
    const url = await getSignedUrl(s3client, command);
    return url;
}

async function putObjectToS3(localFileName, s3Key) {
    const filePath = path.join("tmp", localFileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const fileStream = fs.createReadStream(filePath);

    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET,
        Key: s3Key,
        Body: fileStream,
        ContentType: "video/mp4" // Adjust if needed
    });

    const response = await s3client.send(command);
    console.log("Upload success:", response);
}

async function init() {
    console.log(await getObjectURL("video.mp4"));
    await putObjectToS3("sample-video.mp4", "video.mp4");
}

init();