import storage from "@/lib/storage";

export interface FileToSign {
  originalName: string;
  contentType: string;
  suffix?: string;
}

interface GetPreSignedGcpPutUrlsProps {
  basePath: string; // eg. `products/${slug}/${productId}`
  files: FileToSign[]; // one entry per image
  bucketName?: string;
  expiresInMs?: number; // default 5 minutes
}

const getPreSignedGcpPutUrls = async ({
  bucketName = process.env.GCS_BUCKET_NAME || "",
  basePath,
  files,
  expiresInMs = 5 * 60 * 1000,
}: GetPreSignedGcpPutUrlsProps) => {
  console.log({ bucketName });

  if (!bucketName) throw new Error("GCS_BUCKET_NAME is not configured");
  if (!basePath) throw new Error("basePath is required");
  if (!files?.length) throw new Error("files array is required");

  const results: { url: string; objectPath: string; contentType: string }[] = [];

  for (const [index, file] of files.entries()) {
    const safeName = file.originalName.replace(/\s+/g, "_");
    const uniquePart = file.suffix ?? `${Date.now()}-${index}`;
    const objectPath = `${basePath}/${uniquePart}-${safeName}`;

    const [url] = await storage
      .bucket(bucketName)
      .file(objectPath)
      .getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + expiresInMs,
        // Content-Type must exactly match what the browser will send
        contentType: file.contentType,
      });

    results.push({ url, objectPath, contentType: file.contentType });
  }

  return results;
};

export default getPreSignedGcpPutUrls;
