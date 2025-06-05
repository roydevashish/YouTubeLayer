const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { google } = require('googleapis');

const fs = require("fs/promises");
const fss = require("fs");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
});

const BUCKET = process.env.BUCKET;
const KEY = process.env.KEY;

async function getVideoFromS3Bucket() {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET,
            Key: KEY,
        });
        const result = await s3Client.send(command);

        const filePath = "video.mp4";
        await fs.writeFile(filePath, result.Body);
        console.log("Video file downloaded successfully.")
    } catch (error) {
        console.log("Error: Unable to download video file.");
        console.log(error);
    }
}

const credentials = require('./credentials.json');
const { client_id, client_secret, redirect_uris } = credentials.web;

const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
);

const loadTokens = () => {
    if (fss.existsSync('tokens.json')) {
        const tokens = JSON.parse(fss.readFileSync('tokens.json', 'utf8'));
        oauth2Client.setCredentials(tokens);
    } else {
        console.warn('No tokens found. Authenticate yourself first.');
    }
};

loadTokens();

async function publishVideoToYoutube() {
    if (!oauth2Client.credentials) {
        console.log('Unauthorized. Please authenticate first.');
        return;
    }

    try {
        const filePath = path.resolve("video.mp4");
        const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
        const videoMetadata = {
            snippet: {
                title: "Uploaded Video Title",
                description: "Uploaded via Node.js",
                tags: ["test", "docker", "api"],
            },
            status: {
                privacyStatus: "private",
            },
        };

        const response = await youtube.videos.insert({
            part: 'snippet,status',
            requestBody: videoMetadata,
            media: {
                body: fss.createReadStream(filePath),
            },
        });

        console.log("Video published to youtube successfully.");
    } catch (error) {
        console.log("Error: Unable to publish video to youtube.");
        console.log(error);
    }
}

async function main() {
    // get the video from s3 bucket.
    await getVideoFromS3Bucket();

    // upload the video to the youtube.
    await publishVideoToYoutube();
}

main();