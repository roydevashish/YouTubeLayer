const { ECSClient, RunTaskCommand } = require("@aws-sdk/client-ecs");

const dotenv = require("dotenv");
dotenv.config();

const ecsClient = new ECSClient({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    },
});

async function createContainer() {
    const runTaskCommand = new RunTaskCommand({
        taskDefinition: process.env.TASK_DEFINITION,
        cluster: process.env.CLUSTER,
        launchType: "FARGATE",
        networkConfiguration: {
            awsvpcConfiguration: {
                assignPublicIp: "ENABLED",
                securityGroups: [process.env.SECURITY_GROUP],
                subnets: [
                    process.env.SUBNET_1,
                    process.env.SUBNET_2,
                    process.env.SUBNET_3
                ]
            }
        },
        overrides: {
            containerOverrides: [{
                name: process.env.CONTAINER_NAME,
                environment: [
                    { name: "AWS_KEY", value: process.env.AWS_KEY },
                    { name: "OAUTH_ACCESS_TOKEN", value: process.env.OAUTH_ACCESS_TOKEN },
                    { name: "OAUTH_REFRESH_TOKEN", value: process.env.OAUTH_REFRESH_TOKEN },
                    { name: "OAUTH_SCOPE", value: process.env.OAUTH_SCOPE },
                    { name: "OAUTH_TOKEN_TYPE", value: process.env.OAUTH_TOKEN_TYPE },
                    { name: "OAUTH_EXPIRY_DATE", value: process.env.OAUTH_EXPIRY_DATE },
                ]
            }]
        }
    });

    await ecsClient.send(runTaskCommand);
}

createContainer();