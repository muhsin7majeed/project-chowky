import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  keyFilename: "./gcs-key.json",
});

export default storage;
