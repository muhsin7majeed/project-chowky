export const DIMENSION_UNITS = {
  CM: "cm",
  M: "m",
  IN: "in",
  FT: "ft",
} as const;

export const DIMENSION_UNIT_OPTIONS = Object.entries(DIMENSION_UNITS).map(([label, value]) => ({
  label,
  value,
}));

export const WEIGHT_UNITS = {
  KG: "kg",
  G: "g",
  MG: "mg",
  LB: "lb",
  OZ: "oz",
} as const;

export const WEIGHT_UNIT_OPTIONS = Object.entries(WEIGHT_UNITS).map(([label, value]) => ({
  label,
  value,
}));
