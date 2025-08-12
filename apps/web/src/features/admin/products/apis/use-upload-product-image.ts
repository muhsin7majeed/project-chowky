import { useMutation } from "@tanstack/react-query";
import getProductImagePublicUrl from "../utils/get-product-image-path";

interface UploadProductImagePayload {
  images: File[];
  signedUploads: {
    url: string;
    contentType: string;
    objectPath: string;
  }[];
  bucketName: string;
}

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
        };
      });

      return results;
    },
  });

  return mutation;
};

export default useUploadProductImage;
