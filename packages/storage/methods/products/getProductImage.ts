import { GetObjectCommand, GetObjectCommandInput } from "@aws-sdk/client-s3";
import { getSignedUrl as awsGetSignedUrl } from "@aws-sdk/s3-request-presigner";

import { Bucket, client } from "../../client";

export const getProductImage = async (id: string) => {
	const putObjectParams: GetObjectCommandInput = {
		Bucket,
		Key: `product-image-${id}`,
	};

	const command = new GetObjectCommand(putObjectParams);
	const url = await awsGetSignedUrl(client, command, { expiresIn: 3600 });
	return url;
};
