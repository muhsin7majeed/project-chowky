const getProductImagePublicUrl = (objectPath: string) => {
  const bucket = import.meta.env.VITE_GCS_BUCKET_NAME;
  console.log({ bucket });

  if (!bucket) {
    throw new Error("Bucket name is not set");
  }

  return `https://storage.googleapis.com/${bucket}/${objectPath}`;
};

export default getProductImagePublicUrl;
