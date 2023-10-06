import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { getSignedUrl as awsGetSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

import { Bucket, client } from "~/components/shared/client";

/** Updates an existing product image.
 * Pass an id to overwrite an existing image.
 * Without an id, one will be created by `crypto.randomUUID()`.
 */
export const putProductImage = async (id?: string) => {
	const keyId = `${id}-${Date.now()}` ?? `${crypto.randomUUID()}-${Date.now()}`;

	const putObjectParams: PutObjectCommandInput = {
		Bucket,
		Key: `product-image-${keyId}`,
	};

	const command = new PutObjectCommand(putObjectParams);
	const url = await awsGetSignedUrl(client, command, { expiresIn: 3600 });
	return { url, keyId };
};
