import { boolean, integer, jsonb, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { categories } from "./category";

export const dimensionUnits = ["cm", "m", "in", "ft"] as const;
export const weightUnits = ["kg", "g", "mg", "lb", "oz"] as const;

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }),
  cost: numeric("cost", { precision: 10, scale: 2 }),
  stock: integer("stock"),
  weight: jsonb("weight").$type<{ value: number; unit: (typeof weightUnits)[number] }>(),
  length: jsonb("length").$type<{ value: number; unit: (typeof dimensionUnits)[number] }>(),
  width: jsonb("width").$type<{ value: number; unit: (typeof dimensionUnits)[number] }>(),
  height: jsonb("height").$type<{ value: number; unit: (typeof dimensionUnits)[number] }>(),
  categoryId: integer("category_id").references(() => categories.id),
  isActive: boolean("is_active").notNull().default(true),
  isFeatured: boolean("is_featured").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  isBestSeller: boolean("is_best_seller").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
