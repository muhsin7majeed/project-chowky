import { useMutation } from "@tanstack/react-query";

interface UploadProductImagePayload {
  images: File[];
  signedUploads: {
    url: string;
    contentType: string;
    objectPath: string;
  }[];
  bucketName: string;
}

const getProductImagePublicUrl = (bucketName: string, objectPath: string) =>
  `https://storage.googleapis.com/${bucketName}/${objectPath}`;

const useUploadProductImage = () => {
  const mutation = useMutation({
    mutationFn: async ({ images, signedUploads, bucketName }: UploadProductImagePayload) => {
      if (images.length !== signedUploads.length) {
        throw new Error("Images and signedUploads length mismatch");
      }

      const uploads = images.map((image, index) => {
        const { url, contentType } = signedUploads[index];

        return fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": contentType || image.type || "application/octet-stream",
          },
          body: image,
        });
      });

      const responses = await Promise.all(uploads);

      const results = responses.map((res, i) => {
        const { objectPath } = signedUploads[i];

        return {
          ok: res.ok,
          status: res.status,
          objectPath,
          publicUrl: getProductImagePublicUrl(bucketName, objectPath),
        };
      });

      return results;
    },
  });

  return mutation;
};

export default useUploadProductImage;
