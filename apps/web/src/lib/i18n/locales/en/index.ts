import admin from "./admin";
import app from "./app";
import auth from "./auth";
import categories from "./categories";
import common from "./common";
import products from "./products";
import todos from "./todos";

export default {
  common,
  app,
  auth,
  todos,
  admin,
  categories,
  products,
} as const;
