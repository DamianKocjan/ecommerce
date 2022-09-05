import { S3Client } from "@aws-sdk/client-s3";

const getEnvironment = () => {
	if (process.env.IS_DEV) {
		return "dev";
	} else if (process.env.IS_STAGE) {
		return "stage";
	}
	return "prod";
};

export const client = new S3Client({
	region: "us-east-1",
	credentials: {
		accessKeyId: process.env.AWS_S3_IAM_ACCESS as string,
		secretAccessKey: process.env.AWS_S3_IAM_SECRET as string,
	},
});

export const Bucket = `ecommerce-${getEnvironment()}-bucket`;
