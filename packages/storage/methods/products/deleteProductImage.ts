import {
	DeleteObjectCommand,
	DeleteObjectCommandInput,
} from "@aws-sdk/client-s3";
import { getSignedUrl as awsGetSignedUrl } from "@aws-sdk/s3-request-presigner";

import { Bucket, client } from "../../client";

export const deleteProductImage = async (id: string) => {
	const deleteObjectParams: DeleteObjectCommandInput = {
		Bucket,
		Key: `product-image-${id}`,
	};

	const command = new DeleteObjectCommand(deleteObjectParams);
	const url = await awsGetSignedUrl(client, command, { expiresIn: 3600 });
	return url;
};
