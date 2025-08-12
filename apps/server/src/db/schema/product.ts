import { boolean, integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { categories } from "./category";

export const dimensionUnits = ["cm", "m", "in", "ft"] as const;
export const weightUnits = ["kg", "g", "mg", "lb", "oz"] as const;

export const products = pgTable("products", {
  id: serial("id").primaryKey(),

  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imagePaths:
    jsonb("image_paths").$type<
      {
        objectPath: string;
        sortOrder: number;
        isPrimary: boolean;
      }[]
    >(),

  price: integer("price").notNull(),
  cost: integer("cost"),
  stock: integer("stock").default(0),

  categoryId: integer("category_id").references(() => categories.id),
  sku: text("sku").notNull(),

  status: text("status").default("draft").notNull(),
  isNew: boolean("is_new").default(false),
  isBestSeller: boolean("is_best_seller").default(false),
  isFeatured: boolean("is_featured").default(false),

  // // Dimensions & weight stored as JSON
  weight: jsonb("weight").$type<{ value: number; unit: string }>(),
  length: jsonb("length").$type<{ value: number; unit: string }>(),
  width: jsonb("width").$type<{ value: number; unit: string }>(),
  height: jsonb("height").$type<{ value: number; unit: string }>(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
